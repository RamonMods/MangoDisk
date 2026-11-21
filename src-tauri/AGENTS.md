# Diretrizes de Rust e Tauri

Este arquivo se aplica apenas a `src-tauri/` e herda as regras gerais do repositório em [`../AGENTS.md`](../AGENTS.md).

## Limites do workspace

- `crates/mangodisk-core`: domínios de produto neutros quanto à plataforma, casos de uso, política de segurança, persistência e relatórios. Não deve depender do Tauri nem de uma WebView.
- `crates/mangodisk-platform`: contratos do sistema operacional e implementações para macOS/Windows. Reporta capacidades tipadas e fallbacks seguros; não decide fluxos do produto.
- `src/`: adaptador Tauri fino. Os comandos validam a entrada de transporte, chamam o Core, traduzem erros tipados e publicam eventos.
- `plugins/`: integração isolada de plugins Tauri apenas quando uma capacidade realmente precisa de um plugin.
- Uma CLI formal é um binário de console separado sobre o Core. Comandos de manutenção exclusivamente de engenharia pertencem ao `xtask`, não ao binário da GUI nem à CLI pública.

O Core é organizado em torno de `cleanup`, `storage`, `applications`, `filesystem`, `history` e `reporting`. `storage::analysis`, `storage::large_files` e `storage::duplicates` permanecem como implementações separadas e não devem se tornar um novo `StorageService` gigante.

## Organização e nomenclatura do Rust

- Arquivos e módulos usam `snake_case`; tipos usam substantivos precisos de domínio; funções usam verbos que declaram comportamento observável.
- `duplicates` nomeia o domínio. `duplicate_files` é válido apenas para uma entidade, caso de uso, comando de adaptador ou evento de transporte específico de arquivo.
- Evite `utils` para comportamento de domínio. Coloque um auxiliar junto ao seu responsável ou em um módulo de infraestrutura com nome específico.
- Mantenha a visibilidade mínima. Uma nova API `pub` ou `pub(crate)` deve representar um limite estável de colaboração, não um atalho para contornar a propriedade de módulos.
- Prefira estruturas pequenas e tipadas de requisição/resultado a listas longas de parâmetros e tuplas não relacionadas.
- Mantenha a orquestração de casos de uso em `service.rs`; coloque política de domínio, fingerprinting, mutação e histórico de execução em módulos privados com nomes específicos. Estenda um responsável existente, como o `batch` de uninstall, antes de criar outro módulo auxiliar. Mantenha testes de regressão do serviço em arquivos `service_tests.rs` adjacentes quando eles obscureceriam o fluxo de produção.
- Comentários de código, logs, erros, testes e asserções devem ser claros e consistentes. Explique suposições de segurança, propriedade, compensações de desempenho e motivos de fallbacks.

## Erros, logs e protocolos

- Código de domínio e de plataforma retorna erros tipados ou códigos de erro estáveis. Converta para erros de transporte do Tauri apenas no adaptador.
- Os logs usam o ponto de entrada centralizado de logging do Rust e nomes estáveis de domínio/evento/campo. Registre IDs de operação, nomes/caminhos úteis de objetos, contagens, tempos, motivos de fallback e erros/códigos nativos legíveis. Use `mangodisk_platform::diagnostics::text` para campos de diagnóstico limitados e escapados. Nunca substitua um hash pela única explicação de falha; exclua credenciais e conteúdos de arquivos na origem.
- Estruturas persistidas e entre processos exigem uma versão explícita de schema e uma política documentada de leitura, migração, reconstrução ou rejeição.
- Índices derivados podem ser reconstruídos em versões incompatíveis. Histórico e configurações do usuário exigem leitores compatíveis com versões anteriores ou uma migração explícita.
- Mantenha nomes de comandos e cargas de eventos versionáveis. Não retenha aliases antigos/novos permanentes após a janela de migração.

## Regras e segurança da limpeza

- Regras declarativas de sistema de arquivos ficam em `crates/mangodisk-core/rules/filesystem`; regras de artefatos de projeto ficam em `crates/mangodisk-core/rules/project-artifacts`.
- Colaboradores devem adicionar TOML validado para cobertura comum de limpeza sem editar ramificações `match` em Rust.
- Recursos de regras expõem apenas dados estáveis de máquina. A localização da interface pertence aos arquivos de locale do frontend.
- Um limpador especializado se justifica apenas para um comando do sistema, API de aplicativo, pacote estruturado ou verificação de segurança que o TOML não consegue expressar.
- Todos os fluxos destrutivos preservam prévia/simulação (dry-run), validação de caminhos protegidos, política de links/pontos de novo parse, pré-verificação, intenção explícita do usuário, verificação da execução e sincronização de cache.
- Permissão ausente, ferramentas indisponíveis, rastreamento de alterações sem suporte e incerteza de plataforma devem falhar de forma segura (fail closed) ou usar um caminho seguro mais lento e documentado.

Leia [`crates/mangodisk-core/rules/README.md`](crates/mangodisk-core/rules/README.md) antes de alterar regras de limpeza ou seu schema de sistema de arquivos.

## Código de plataforma

- Defina o contrato antes de mover uma implementação. Fatos de plataforma não devem importar conceitos de limpeza ou de interface.
- Mantenha `cfg` em limites estreitos de módulo ou item. Um campo, import ou acessador exclusivo de plataforma deve ser compilado condicionalmente, e não silenciado com atributos de código morto.
- Caminhos rápidos nativos exigem um fallback correto e diagnósticos que distingam comportamento de travessia rápida, em cache, incremental e completa.
- Testes que não podem rodar no sistema operacional atual podem usar `cfg` explícito; não faça um teste de plataforma passar substituindo seu comportamento por um mock no código de produção.
- Operações privilegiadas exigem um limite de capacidade revisado separadamente. Não amplie permissões do Tauri nem simule um helper privilegiado dentro de um limpador comum.

## Adaptador Tauri e plugins

- Manipuladores de comando permanecem como adaptadores assíncronos e não contêm algoritmos de varredura, limpeza ou persistência.
- Registre cada comando, permissão, capacidade, binding de frontend e inicialização de plugin na mesma alteração.
- Bindings gerados de plugin ou Specta são artefatos gerados; regenere-os pela ferramenta de origem em vez de editá-los manualmente.
- Mantenha escopos de capacidade mínimos e específicos por plataforma quando apropriado.
- A inicialização do app não deve realizar varreduras longas nem trabalho de sistema de arquivos bloqueante antes da primeira janela ser renderizada.

## Validação

Para alterações em Rust, execute:

```sh
pnpm rust:fmt:check
pnpm rust:clippy
pnpm rust:check
pnpm rust:test:desktop
cargo test --manifest-path src-tauri/Cargo.toml -p mangodisk-core
```

Execute `pnpm check` antes de enviar ou mesclar uma alteração. Alterações multiplataforma devem executar as verificações aplicáveis em ambientes macOS e Windows. Se uma plataforma não estiver disponível, documente o escopo não validado. Alterações em regras, motores de varredura, índices, persistência, caminhos rápidos nativos ou desempenho exigem testes ou uma medição reproduzível apropriada ao comportamento afetado; mantenha evidências brutas da máquina e conjuntos de dados privados fora do repositório.
