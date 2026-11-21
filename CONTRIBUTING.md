# Contribuindo para o MangoDisk

Obrigado por contribuir para o MangoDisk. Este guia define o fluxo de trabalho de
contribuição; as instruções do repositório continuam sendo a referência
autoritativa para os detalhes de implementação.

## Antes de fazer uma alteração

1. Leia [`AGENTS.md`](AGENTS.md) e as instruções da subárvore mais próxima.
2. Mantenha as responsabilidades de Core, Platform, Tauri, CLI e Vue separadas.
3. Prefira TOML validado ao estender a cobertura comum de limpeza.
4. Explique a responsabilidade, o comportamento em caso de falha e os testes
   antes de introduzir uma capacidade que atravesse três ou mais domínios.

## Requisitos de desenvolvimento

- Use o Node.js 24 e a versão do pnpm declarada em `package.json`.
- Use a toolchain do Rust declarada pelo repositório.
- O empacotamento do Windows Explorer respeita `WindowsSdkDir` do shell do
  desenvolvedor. Defina-o para a raiz do SDK instalado quando o SDK usar um local
  personalizado; caso contrário, a compilação usa o diretório padrão do Windows
  Kits.
- Mantenha os textos voltados ao usuário sincronizados em todos os recursos de
  idioma suportados.
- Use caminhos genéricos e determinísticos nos testes.
- Nunca faça commit de credenciais, caminhos pessoais, nomes de arquivos
  privados, resultados brutos de varredura, saídas de compilação ou diretórios
  locais de dependências.
- Preserve os limites de simulação (dry-run), caminhos protegidos,
  pré-verificação (preflight), confirmação e verificação para todo fluxo
  destrutivo.

## Validação

Execute a validação local completa antes de enviar uma alteração:

```sh
pnpm check
cargo test --manifest-path src-tauri/Cargo.toml -p mangodisk-core
```

Alterações multiplataforma exigem as verificações aplicáveis no macOS e no
Windows. Se uma plataforma não estiver disponível, identifique esse escopo não
validado no pull request. Alterações de desempenho devem descrever uma carga de
trabalho reproduzível e o resultado antes e depois, sem fazer commit de
relatórios brutos de máquina ou conjuntos de dados privados.

Execute os testes de permissão do sistema de arquivos a partir de um terminal
normal da área de trabalho do Windows. Sessões SSH com privilégios de
backup/restauração habilitados podem ignorar as ACLs dos fixtures e invalidar
suas asserções de negação de permissão; não suprima essas falhas.

Para a validação de execução nativa de privacidade em uma máquina Windows
descartável, execute:

```powershell
$env:MANGODISK_PRIVACY_VALIDATION_DIR = Join-Path $PWD 'validation/privacy'
cargo test --manifest-path src-tauri/Cargo.toml -p mangodisk-core --test windows_privacy_execution_validation native_privacy_execution_matrix -- --ignored --nocapture
```

Este teste opcional (opt-in) cria perfis de navegador exclusivos nos diretórios
nativos de perfil da conta atual e seleciona apenas as fontes por ele geradas.
Ele cobre exclusões, estado de processos, bloqueios, junctions, desvio (drift),
cancelamento, falhas de histórico, isolamento de plataforma e limites de
conteúdo de diagnóstico. Os perfis gerados são removidos em seguida; as
evidências permanecem no diretório escolhido e não devem ser enviadas em commit.

As opções de serviço do Windows alteram a inicialização automática, não o estado
de execução atual. Somente serviços de terceiros elegíveis são graváveis;
entradas protegidas ou incertas permanecem somente leitura. A desativação
preserva a configuração de inicialização atrasada no valor de registro de
serviço `MangoDiskStartupRestoreV1`, de propriedade do administrador. Versões de
backup desconhecidas ou malformadas falham antes da mutação; a reativação
bem-sucedida remove o backup. O protocolo v4 do auxiliar de inicialização
rejeita solicitações antigas antes da execução. Para alterações de controle de
serviço, execute os testes ignorados `windows::startup::service_control` em uma
VM Windows elevada e descartável. O teste de serviço existente requer uma lista
de permissões explícita `MANGODISK_TEST_SERVICE_NAMES` (separada por ponto e
vírgula); escolha serviços de terceiros não críticos e verifique se a
configuração e o estado de execução são restaurados em seguida.

No macOS, valide que fechar oculta a janela, reabrir pelo Dock a restaura, e
Sair encerra imediatamente, inclusive durante uma varredura, usando o aplicativo
empacotado.

## Pull requests

- Mantenha cada pull request focado em um propósito coerente.
- Explique o comportamento observável, o impacto na segurança e as evidências de
  validação.
- Adicione testes para limites de segurança, alterações de protocolo,
  persistência e regressões.
- Atualize as orientações do README voltadas a colaboradores na mesma alteração
  que modifica seu comportamento.
- Não oculte falhas com atributos allow, configurações globais da máquina ou
  fallbacks não documentados.

Vulnerabilidades de segurança devem seguir [`SECURITY.md`](SECURITY.md), em vez
de uma issue pública.
