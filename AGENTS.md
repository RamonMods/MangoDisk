# Diretrizes de contribuição do MangoDisk

Estas regras se aplicam a todo o repositório. Orientações mais específicas ficam em [`src/AGENTS.md`](src/AGENTS.md) e [`src-tauri/AGENTS.md`](src-tauri/AGENTS.md); um arquivo filho adiciona apenas regras para sua própria subárvore e não substitui este arquivo.

## Produto e arquitetura

MangoDisk é um aplicativo desktop Tauri 2 para análise e limpeza segura de discos. O frontend Vue é um adaptador para a interação com o usuário. O Rust é responsável pelo acesso ao sistema de arquivos, pela segurança da plataforma, pela orquestração da varredura, pela execução da limpeza e pelos dados operacionais persistidos.

Mantenha estáveis estes limites de domínio:

- `cleanup`: regras de limpeza, prévias, pré-verificação, execução e verificação;
- `storage`: análise de disco, descoberta de arquivos grandes e detecção exata de duplicatas;
- `applications`: identidade de aplicativos instalados e capacidades escopo por aplicativo;
- `filesystem`: caminhos, travessia, exclusão permanente, identidade e primitivas de proteção;
- `history` e `reporting`: registros de operações e evidências legíveis por máquina;
- `platform`: contratos e implementações do sistema operacional, não orquestração de produto;
- GUI, CLI e comandos Tauri: adaptadores irmãos sobre os mesmos casos de uso do Core.

`duplicates` é o domínio de duplicatas de conteúdo exato. Use `duplicate_files` apenas para uma entidade, caso de uso, comando, evento ou página específica de arquivo. Uma futura funcionalidade de fotos semelhantes pertence a um domínio de similaridade separado e não deve enfraquecer a semântica de duplicata exata.

Não crie módulos amplos como `common`, `misc`, `manager`, `optimization` ou um novo serviço que agregue domínios não relacionados. Páginas de produto podem combinar resultados de domínios sem mover essa coordenação para um serviço gigante no Core.

## Princípios de implementação

1. Prefira o menor projeto prático que preserve um limite claro. Não adicione abstrações para reutilização hipotética.
2. Mantenha efeitos colaterais nos adaptadores e nos limites de domínio. Classificação, formatação e cálculo puros devem permanecer determinísticos.
3. Torne o comportamento configurável quando os colaboradores puderem estendê-lo com segurança como dados. Regras de limpeza normalmente devem ser TOML declarativo validado em tempo de build, e não ramificações em Rust.
4. Não acople recursos de regras à localização da interface. As regras expõem IDs, categorias, riscos, capacidades e diagnósticos estáveis; os arquivos de locale são responsáveis pelo texto voltado ao usuário.
5. Preserve os invariantes de segurança: simulação (dry-run), caminhos protegidos, tratamento de links/pontos de novo parse, pré-verificação, confirmação explícita, verificação e fallback seguro quando capacidades não estão disponíveis.
6. Nunca esconda uma regressão de compatibilidade ou desempenho com um atributo allow, uma configuração global da máquina ou um fallback não documentado.

## Nomenclatura e texto

- Arquivos e módulos Rust usam `snake_case`; nomes de arquivos de frontend, documentação e recursos usam `kebab-case`, a menos que uma ferramenta externa exija outro formato.
- Comentários no código-fonte, logs, códigos de diagnóstico, nomes de testes e asserções devem ser claros e consistentes. Todos os comentários de código devem usar inglês idiomático e profissional. Os comentários explicam razões, riscos e limites não óbvios, em vez de repetir o código.
- Texto voltado ao usuário pertence aos recursos de locale. Atualize todos os locales suportados quando o comportamento visível ao colaborador mudar.
- Use enums ou códigos tipados e estáveis entre limites de processo e de persistência. Não faça a lógica da interface inferir comportamento a partir de mensagens de formato livre.

## Higiene do repositório

- Alterações existentes e não rastreadas pertencem ao usuário, salvo prova em contrário. Não sobrescreva, delete, reformate nem inclua alterações não relacionadas em um commit.
- Não edite código-fonte gerado ou de terceiros para implementar comportamento de toda a aplicação.
- Importe módulos de negócio pertencentes ao projeto a partir de arquivos concretos. Não adicione arquivos barrel de negócio.
- Mantenha relatórios gerados fora dos diretórios de código-fonte de produção e use caminhos curtos e estáveis que possam ser feitos checkout no Windows.
- Não faça commit de credenciais, conteúdos de arquivos pessoais, caminhos privados brutos em Markdown, saídas de build ou diretórios locais de dependências.
- Os logs devem identificar o objeto afetado, o estágio da operação, o erro/código nativo e o resultado. Mantenha nomes e caminhos quando ajudarem a reproduzir ou diagnosticar uma falha; não substitua o único erro útil ou a identidade do objeto por um hash. Exclua credenciais, tokens de autorização, conteúdos de documentos e metadados não relacionados. Escape caracteres de controle, limte a saída de comandos e resuma resultados de varredura repetitivos. Hashes de integridade e de protocolo mantêm sua finalidade original.
- Não faça push a menos que o usuário solicite explicitamente. Um pedido para fazer commit não autoriza push.

## Fluxo de trabalho

1. Leia o `AGENTS.md` mais próximo antes de alterar o código.
2. Inspecione o worktree e estabeleça uma linha de base de comportamento ou desempenho proporcional ao risco.
3. Escreva um plano de implementação conciso para trabalhos com várias etapas e mantenha-o atualizado quando o escopo mudar.
4. Mantenha movimentos estruturais separados de alterações de comportamento sempre que isso evitar ambiguidade na revisão.
5. Valide o comportamento multiplataforma em ambientes aplicáveis de macOS e Windows. Se uma plataforma não estiver disponível, documente o escopo não validado em vez de afirmar suporte com base em resultados locais.
6. Para alterações de comportamento ou desempenho, descreva a carga de trabalho testada, o ambiente e o resultado observável na descrição da alteração, sem fazer commit de relatórios brutos da máquina ou de dados privados.
7. Revise o diff final quanto à correção, segurança, privacidade, fallbacks de plataforma, nomenclatura e documentação desatualizada antes de fazer commit.
8. Para inspeção de interface nativa no macOS, pare os processos do MangoDisk, do Tauri dev e do Vite antes de compilar com `pnpm tauri build --debug --bundles app --no-sign`. Inicie e inspecione o caminho exato `target/debug/bundle/macos/MangoDisk.app`; o executável bruto do `tauri dev` não tem bundle ID e não pode ser direcionado de forma confiável pela automação de interface do macOS.

## Validação obrigatória

Execute as verificações aplicáveis menores durante o desenvolvimento e as verificações completas antes de enviar uma alteração ou preparar uma versão:

```sh
pnpm check
cargo test --manifest-path src-tauri/Cargo.toml -p mangodisk-core
```

`pnpm build` executa os testes do frontend e do Core antes de produzir os assets; o empacotamento Tauri usa este gate por meio de `beforeBuildCommand`. `pnpm check` também inclui os testes do Core. `pnpm build:frontend` é a etapa apenas de assets usada após os testes pelo pipeline de validação; não é um ponto de entrada de validação de versão.

Trabalhos multiplataforma também devem executar as mesmas verificações aplicáveis em um ambiente Windows. Quando uma plataforma obrigatória não estiver disponível, indique essa limitação na descrição da alteração. Alterações de desempenho exigem uma medição reproducível de antes e depois apropriada ao caminho afetado, mas relatórios brutos da máquina e conjuntos de dados privados devem permanecer fora do repositório.

Testes são obrigatórios para lógica de alto risco, compatibilidade de protocolo, migrações de persistência, limites de segurança e regressões. Alterações comuns apenas de apresentação podem depender de verificações de tipo, build e interação quando um teste automatizado não agregaria confiança significativa.

## Orientação pública

- Mantenha as orientações de colaboração concisas e coloque instruções específicas de domínio perto do código ou do schema que elas governam. Adicione nova documentação de nível superior apenas quando houver um público claro e durável.
- Não faça commit de pesquisas privadas, relatórios brutos da máquina, conjuntos de dados privados, credenciais ou ferramentas privadas de versão. Decisões de arquitetura duráveis podem ser documentadas publicamente quando ajudam os colaboradores a entender ou estender o projeto.
- Atualize a orientação pública na mesma alteração quando o comportamento visível ao colaborador ou a validação mudar.
