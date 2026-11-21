# Contribuindo com regras declarativas de limpeza

O MangoDisk mantém o comportamento comum de limpeza em recursos TOML validados. Use este guia para adicionar regras de limpeza de sistemas de arquivos para caches de aplicativos e do sistema, ou regras de artefatos de projeto para saídas reconstruíveis dentro de projetos de código-fonte. Se a limpeza exigir um comando do sistema, uma API de aplicativo, coordenação de recursos compartilhados ou confirmação especial de alto impacto, implemente um limpador dedicado em vez de enfraquecer o modelo de segurança declarativo.

## Escolha o tipo de regra correto

- Use uma **regra de sistema de arquivos** para um cache conhecido, log, relatório de falha, diretório temporário ou outro local descartável pertencente ao sistema operacional, a um aplicativo instalado ou a uma ferramenta de desenvolvedor.
- Use uma **regra de artefato de projeto** para diretórios reconstruíveis descobertos dentro de projetos de código-fonte, como `target`, `node_modules` ou caches de build de frameworks.
- Use um **limpador dedicado** quando a exclusão exigir lógica específica do aplicativo, comandos do sistema, privilégios elevados, consciência de blobs compartilhados ou validação imediatamente antes da execução.

A limpeza nativa do Windows deve distinguir dados legíveis do acesso de exclusão. O limpador de logs do sistema sonda o acesso `DELETE` sem alterar arquivos; quando todos os candidatos negam permissão de exclusão a uma conta não elevada, ele reporta `requiresElevation`. O erro de manipulador nativo `0x800702E4` tem o mesmo status.
O diretório fixo de backup de rastreamento do Windows `System32\LogFiles\WMI\RtBackup` é excluído para todas as contas, incluindo processos elevados; não altere sua ACL somente SYSTEM para habilitar a limpeza.
Diretórios de log elegíveis ilegíveis não podem ser reportados como limpos. Inventários incompletos bloqueiam a execução; inventários incompletos pós-limpeza reportam falha de verificação em vez de liberação confirmada.
Itens marcados como `requiresElevation` exigem reiniciar o MangoDisk como administrador e fazer uma nova varredura.
A verificação privilegiada no aplicativo continua limitada a instalações anteriores do Windows. O acesso elevado não ignora arquivos bloqueados, ACLs, verificações de pontos de repetição (reparse points) nem verificação. Falhas de itens retêm diagnósticos limitados de caminho, estágio e erro nativo.

O limpador de arquivos temporários do sistema Windows, opcional, possui apenas o filho `SystemTemp` do diretório nativo do Windows. Ele preserva a raiz, os diretórios, os arquivos somente leitura, os links/pontos de repetição (reparse points) e os arquivos modificados nos últimos sete dias.
Inventários incompletos bloqueiam a execução; objetos alterados, arquivos bloqueados e acesso de exclusão negado permanecem no local e são reportados. Ele usa as verificações de identidade de exclusão permanente existentes e nunca altera ACLs nem assume propriedade.
Varreduras com permissão limitada exigem reinício como administrador e nova varredura, não um auxiliar de elevação no aplicativo. A janela de retenção é uma política de produto conservadora; o [contrato de caminho temporário do Windows](https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-gettemppath2w)
estabelece a finalidade e o limite de acesso deste local, não sua descartabilidade universal.

O limpador de cache de usuários adicionais do macOS retém snapshots revisados para fontes com falha e não selecionadas entre as etapas de limpeza. Apenas fontes excluídas com sucesso saem do snapshot. Novas tentativas devem verificar novamente propriedade, processos em execução, links e metadados em relação à revisão original.
As raízes de cache e seus descendentes retêm suas identidades físicas, portanto substituir um objeto preservando seu tamanho e horário de modificação exige uma nova varredura. Dados alterados nunca devem ser reautorizados silenciosamente. Os diagnósticos de execução incluem a operação, o caminho da fonte, o estágio da falha e a causa nativa, com detalhes de item limitados.

## Layout de diretórios

```text
rules/
├── filesystem/
│   ├── macos/
│   │   ├── system/
│   │   ├── browser/
│   │   ├── application/
│   │   ├── development/
│   │   ├── ai/
│   │   └── container/
│   └── windows/
│       └── ...
└── project-artifacts/
    ├── rust.toml
    ├── node.toml
    └── ...
```

Os caminhos de sistemas de arquivos são exigidos como `filesystem/<platform>/<category>/<rule-id>.toml`. Os arquivos de artefatos de projeto usam, por convenção, `project-artifacts/<ecosystem>.toml`. Categorias vazias não precisam de diretórios fictícios.

Antes de adicionar uma regra, encontre o exemplo existente mais próximo e verifique o limite de limpeza com documentação autoritativa ou com o comportamento atual do aplicativo em disco. Uma regra deve selecionar apenas dados descartáveis ou reproduzíveis. Não selecione configurações, credenciais, bancos de dados, código-fonte de projetos, arquivos pessoais, modelos gerenciados pelo usuário nem dados cuja propriedade seja incerta.

## Regras de sistema de arquivos

As regras de sistema de arquivos usam a versão 3 do schema. O build valida e incorpora todos os arquivos TOML; em seguida, o tempo de execução analisa novamente a fonte incorporada com o mesmo schema.

Comece com este exemplo mínimo e substitua todos os valores de exemplo:

```toml
id = "dev.example-cache"
schema_version = 3
rule_version = 1
platform = "macos"
category = "development"
risk = "recoverable"
default_selected = false
recommended_selected = false
required_stopped_processes = []

[[applicability]]
kind = "anyOf"
items = [
  { kind = "executableAvailable", names = ["example"] },
  { kind = "anyRootExists" },
]

[[roots]]
template = "${user_library}/Caches/Example"
verified_rebuildable = true

[matcher]
kind = "all"

[execution]
kind = "deleteMatchingContents"
requires_app_close = false

[verification]
lifecycle = "verified"
evidence = "Example stores reproducible cache data in this directory; settings, credentials, projects, and user-created content remain outside the selected root"
verified_at = "2026-08-05"
verified_platform = "macos"
references = ["https://example.com/official-cache-documentation"]
```

Veja [`filesystem/macos/development/dev.pnpm-cache.toml`](filesystem/macos/development/dev.pnpm-cache.toml) para uma regra real.

### Identidade, seleção e risco

- `id` deve usar letras ASCII minúsculas, dígitos, `.`, `-` ou `_`, e o nome do arquivo deve ser `<id>.toml`.
- `rule_version` deve ser positivo. Incremente-o quando uma alteração modificar raízes, correspondência, execução, risco, aplicabilidade ou semântica de verificação.
- `platform` é `macos`, `windows` ou `linux`.
- `category` é `system`, `browser`, `application`, `development`, `ai` ou `container`.
- `risk` é `safe`, `recoverable` ou `highImpact`.
- `default_selected = true` é permitido apenas para regras `safe`. `recommended_selected` controla a recomendação compartilhada usada pelo aplicativo desktop e pela seleção `recommended` da CLI. Uma regra `recoverable` pode ser recomendada apenas quando todas as raízes têm `verified_rebuildable = true`.
- Quando `requires_app_close = true`, `required_stopped_processes` deve conter os nomes individuais dos executáveis que a verificação prévia (preflight) deve interromper ou rejeitar. Quando o fechamento do aplicativo não é necessário, a lista deve estar vazia.

### Aplicabilidade

Toda regra de sistema de arquivos deve conter pelo menos uma sonda `[[applicability]]`. A aplicabilidade evita travessias desnecessárias; ela nunca afrouxa a segurança de raiz ou de correspondência. Uma regra conhecidamente inaplicável é ignorada, enquanto dados de inventário ausentes ou incompletos mantêm a regra elegível para varredura.

As sondas compatíveis são:

- `anyRootExists`
- `pathExists`
- `applicationInstalled` e `applicationVersion`
- `executableAvailable`
- `systemVersion`, `fileSystemIn` e `capabilityAvailable`
- `processRunning`
- `anyOf`, `allOf` e `not`

Múltiplos identificadores ou nomes dentro de uma sonda são aliases para o mesmo fato e correspondem quando qualquer alias tem sucesso. Use `allOf` quando fatos independentes devem ser todos verdadeiros. Aplicativos portáteis podem não aparecer no inventário de instalação; portanto, combine evidência de identidade com um caminho controlado quando apropriado:

```toml
[[applicability]]
kind = "anyOf"
items = [
  { kind = "applicationInstalled", identifiers = ["com.example.browser"] },
  { kind = "pathExists", template = "${user_library}/Caches/ExampleBrowser" },
]
```

Caminhos absolutos arbitrários, variáveis de ambiente e execução de comandos não são entradas válidas de aplicabilidade.

### Raízes

Todo modelo de raiz deve começar com uma variável controlada em minúsculas e usar separadores `/`. As variáveis compatíveis são:

- Todas as plataformas: `${home}`, `${temp}`, `${system_root}`
- macOS: `${user_library}`, `${application_support}`, `${darwin_user_cache}`
- Windows: `${local_app_data}`, `${roaming_app_data}`, `${program_files}`, `${program_data}`

As regras de sistema de arquivos do Linux se limitam à limpeza pertencente ao usuário e sem privilégios: suas raízes
devem resolver para dentro de `${home}` ou para o `${temp}` do usuário atual, não devem usar
`${system_root}` nem outros locais pertencentes ao sistema, e `[execution]` deve permanecer na
estratégia declarativa `deleteMatchingContents` com apenas verificação. Isso mantém toda regra Linux
executável sem elevação, enquanto diretórios temporários compartilhados permanecem protegidos pelas
verificações de propriedade e snapshot do motor antes da exclusão.

Uma raiz estática precisa apenas de `template`. Use `kind = "childDirectories"` somente quando a regra precisar expandir diretórios filhos diretos por meio de `child_names`, `child_prefixes`, `include_all_children` ou `suffixes` fixos. O validador rejeita travessia de diretório pai, variáveis não controladas, raízes duplicadas, locais protegidos, expansão insegura e correspondência ampla fora de limites de cache reconhecidos ou de locais reconstruíveis verificados.

Falhas de leitura durante a descoberta opcional de raiz e a travessia do sistema de arquivos preservam os resultados legíveis
e contribuem para o diagnóstico `readFailureCount` da varredura. Ignorar intencionalmente links, montagens e
marcadores de nuvem (cloud placeholders) continua sendo uma precaução de segurança e não implica falha de leitura. No macOS, `accessLimited`
indica uma leitura protegida de dados de aplicativo para a qual as configurações de privacidade podem ajudar; uma negação comum de BSD/ACL
não define esse estado. A varredura ainda aguarda a resposta do usuário a um prompt nativo de autorização.

### Correspondências e execução

Os tipos de correspondência compatíveis são `all`, `nameEquals`, `nameGlob`, `extensionIn`, `pathSegmentIn`, `olderThan`, `largerThan`, `smallerThan`, `maxDepth`, `allOf`, `anyOf` e `not`. Correspondências de nome aceitam nomes, não caminhos; `nameGlob` não oferece suporte a `**`. Valores numéricos de idade, tamanho e profundidade devem ser maiores que zero.

Regras declarativas de sistema de arquivos oferecem suporte a `deleteMatchingContents` e à estratégia opcional `deleteWholeRoot`. Uma correspondência ampla `all` só é apropriada quando a própria raiz é um cache definido de forma restrita ou um local reconstruível verificado. Prefira uma correspondência mais estreita sempre que a raiz contiver dados de finalidades mistas.

`deleteWholeRoot` remove a raiz verificada diretamente com uma verificação leve de identidade de raiz e uma travessia cancelável que registra as remoções observadas. Falhas deixam as entradas sobreviventes em seus caminhos originais; a execução não cria diretórios de preparação (staging) nem tenta reversão. Ela é aceita apenas para raízes estáticas com `verified_rebuildable = true`, uma correspondência exata `all` e `default_selected = false`. A execução em tempo de execução também exige que a regra possua a raiz completa e um agregado nativo capaz de ler cada entrada sem links nem omissões por permissão. Limpeza com escopo de fonte, propriedade aninhada de regras, travessia nativa não compatível e qualquer entrada ignorada retornam automaticamente a `deleteMatchingContents` antes da modificação. Uma exclusão com falha é reportada sem tentar novamente por outra estratégia.

### Verificação

Recursos de produção aceitam os ciclos de vida `verified`, `stable` e `deprecated`. Regras `candidate` e `disabled` são rejeitadas do catálogo de produção. `evidence` deve explicar por que os dados selecionados são descartáveis e quais dados importantes permanecem fora do limite. `verified_at` usa `YYYY-MM-DD`, e `verified_platform` deve corresponder à plataforma da regra. Adicione `references` HTTPS autoritativas sempre que estiverem disponíveis.

Para caches definidos de forma restrita, documentação oficial ou a implementação upstream que estabeleça propriedade, descartabilidade e regeneração podem ser combinadas com testes isolados de varredura, simulação (dry-run), exclusão e preservação de dados adjacentes. Não é necessário instalar todos os aplicativos. Caches compartilhados de frameworks ainda precisam de evidência de caminho específica do aplicativo; conteúdo offline, bancos de dados, armazenamentos compartilhados e lógica ativa de instalação ou retenção de versões exigem validação no nível do aplicativo. Registre a evidência real e o método de validação; `verified` não deve implicar um teste de instalação que não foi realizado.

Comentários de regras e evidências de verificação são textos voltados a desenvolvedores e devem usar inglês para que a verificação automatizada de fontes possa validar um catálogo público de regras consistente. Não adicione nomes de UI, descrições, textos de impacto, chaves de localização ou campos de locale ao TOML.

### Dados pessoais e de alto valor protegidos

A raiz inicial (home), Downloads, Documents, Desktop, diretórios de projetos, repositórios, credenciais e pastas sincronizadas com a nuvem não são raízes de cache comuns. Não os combine com `all`, padrões de nome amplos ou correspondências compostas que possam degradar para seleção da raiz inteira.

`system.stale-partial-downloads` é a única exceção para Downloads. Ela é aceita apenas quando todas estas condições permanecem verdadeiras:

- o ID da regra é exatamente `system.stale-partial-downloads`;
- a raiz normalizada é exatamente o diretório Downloads do usuário atual;
- `risk` é `recoverable` e `default_selected` é `false`;
- a correspondência é `allOf`;
- `olderThan` é de pelo menos sete dias;
- `extensionIn` contém apenas `crdownload`, `download`, `partial` e `part`;
- `maxDepth` não é maior que três.

Modelos de IA são dados valiosos e baixáveis. Regras comuns de sistema de arquivos não devem selecionar diretórios de projetos, armazenamentos de modelos do Ollama, dados do LM Studio nem diretórios de modelos gerenciados pelo usuário. O limpador dedicado de modelos de IA valida os layouts oficiais de armazenamento, blobs compartilhados, links e cada modelo imediatamente antes da execução.

Modelos do ComfyUI usam o adaptador dedicado `special.ai-model-comfyui`. Ele lê os diretórios de modelos
compartilhados/por instalação atuais do Desktop, o `basePath` legado do Desktop e o YAML de caminho de modelos,
além de instalações manuais verificadas por marcador encontradas pela varredura/índice de projetos existente. Caminhos
YAML são resolvidos em relação ao seu arquivo de configuração; as configurações de diretório de modelos devem identificar
localizações explícitas. A descoberta não executa Python, não lança scripts nem tags YAML.

Apenas arquivos de pesos e pacotes completos do Diffusers podem ser selecionados, nunca uma instalação ou
raiz de dados compartilhados. Entradas, saídas, fluxos de trabalho, conjuntos de dados, nós personalizados, downloads parciais e
links/pontos de repetição (reparse points) são excluídos. Modelos continuam opcionais; pesos compartilhados ou treinados pelo usuário
podem não ter substituto baixável. Processos do ComfyUI ou Python em execução não bloqueiam
seleção ou exclusão e nunca são encerrados por este limpador. A exclusão pode afetar tarefas em execução
ou carregamentos posteriores de modelos. Arquivos que não podem ser removidos são ignorados com diagnósticos nativos;
outros modelos selecionados continuam. A execução verifica novamente
a associação à configuração, as identidades físicas e os snapshots de metadados antes da modificação.
Leituras de configuração e travessia de modelos são limitadas; evidência incompleta bloqueia a limpeza.
Diretórios explícitos do Diffusers mantêm a seleção do pacote inteiro quando raízes gerais de modelos
os duplicam ou contêm; pacotes incompletos nunca se tornam fontes individuais de pesos.
Metadados comuns do Finder `.DS_Store` são incluídos nos pacotes selecionados; downloads temporários,
dados ocultos desconhecidos, links e diretórios que usam esse nome de metadado permanecem excluídos.
Veja a [documentação oficial de caminhos de modelos](https://docs.comfy.org/basic-concepts/models)
e [localizações de dados do Desktop](https://docs.comfy.org/installation/desktop/macos).

## Regras de artefatos de projeto

Regras de artefatos de projeto usam a versão 1 do schema e descrevem saídas reconstruíveis dentro de um projeto de código-fonte reconhecido. Elas são sempre recuperáveis e opcionais.

Comece com este exemplo mínimo:

```toml
id = "project.example-build-artifacts"
schema_version = 1
rule_version = 1
platforms = ["macos", "windows"]
category = "development"
risk = "recoverable"
default_selected = false

[match]
file_names_any = ["example-project.toml"]

[[artifacts]]
kind = "relativeDirectory"
path = "build"

[verification]
lifecycle = "verified"
evidence = ["https://example.com/official-build-directory-documentation"]
verified_at = "2026-08-05"
```

Veja [`project-artifacts/node.toml`](project-artifacts/node.toml) para uma regra real.

As restrições de artefatos de projeto são intencionalmente restritas:

- `id` deve começar com `project.` e usar tokens ASCII minúsculos separados por pontos.
- `platforms` deve conter um ou ambos entre `macos` e `windows`, sem duplicatas.
- `category`, `risk` e `default_selected` devem permanecer como `development`, `recoverable` e `false`.
- `[match]` deve identificar o projeto com pelo menos um valor `file_names_any` ou `file_suffixes_any` semelhante a extensão. Use `relative_paths_all` e `relative_paths_any` apenas como evidência adicional do projeto.
- Toda regra precisa de pelo menos um artefato. `relativeDirectory` seleciona um caminho relativo normalizado. `descendantDirectory` seleciona um nome de diretório abaixo do projeto e exige `max_depth` de 1 a 64.
- Caminhos de artefatos devem ser caminhos relativos normalizados, sem raízes absolutas, segmentos `.` ou travessia `..`.
- O ciclo de vida de verificação deve ser `verified`, a evidência deve conter pelo menos uma fonte HTTPS autoritativa e `verified_at` deve usar `YYYY-MM-DD`.

### Proteção de conteúdo autoral

A prévia de artefatos de projeto e a verificação prévia (preflight) de exclusão final inspecionam a árvore selecionada em busca de entradas
`.git` aninhadas e arquivos `*-keypair.json`. Um repositório Git que contém o artefato também exige uma sonda
`git ls-files` isolada e bem-sucedida, confirmando que o artefato não contém arquivos rastreados. Git ausente,
entradas ilegíveis, cancelamento ou um tempo limite de cinco segundos na sonda Git impedem a exclusão. A inspeção de nomes
de entradas compartilha a travessia limitada de medição e não tem limite independente de tempo de relógio ou de número de entradas.
Artefatos protegidos ou incompletos permanecem visíveis como fontes limitadas; projetos irmãos completos
continuam selecionáveis de forma independente. Isso protege dados autorais, como chaves de programas Anchor
armazenadas em `target/deploy`, incluindo arquivos introduzidos após a prévia.

### Descoberta de worktrees do Codex

Varreduras regulares de limpeza profunda também inspecionam `${CODEX_HOME}/worktrees` (ou
`~/.codex/worktrees` quando a variável de ambiente não está definida). A descoberta é limitada
ao layout `worktrees/ID/checkout` e exige ponteiros Git recíprocos correspondentes, sem componentes
de caminho vinculados. Metadados opcionais `codex-thread.json` não são necessários dentro deste local
configurado. Fora dele, metadados de propriedade do Codex continuam necessários para a classificação
específica do Codex. Checkouts identificados usam as regras de artefatos de projeto
opcionais existentes; não há modo de varredura nem fluxo de limpeza separados. Escopos explícitos
de projeto não são expandidos. Sessões, imagens, credenciais, plugins, arquivos de código-fonte
e worktrees inteiros nunca são alvos de limpeza.

Fontes de artefatos do Codex usam o requisito existente de fechamento por fonte enquanto
Codex ou ChatGPT estiver em execução. Processos globais de Node, Python, Cargo e outros builds
não estão associados a um checkout e não são bloqueadores nem alvos de fechamento.
Fontes permanecem selecionáveis. A confirmação usa o painel compartilhado opcional de fechamento de
aplicativo, desmarcado por padrão; apenas fontes selecionadas contribuem para ele.
O Core resolve IDs de regras de projeto confiáveis para o conjunto fixo de aplicativos Codex/ChatGPT,
nunca para nomes de processos fornecidos pelo frontend.
A execução verifica novamente a procedência do checkout e os processos em execução antes da exclusão;
inventário de processos indisponível falha de forma segura (fail closed) para estes artefatos, não para outros projetos.
A execução reporta gravadores conhecidos como `blocked` / `runningProcesses` (ou `partial`
quando outras fontes foram limpas). Associações Git alteradas e inspeção de processos indisponível
reportam `preflightFailed`, com razões de diagnóstico distintas.
Para exclusão e validação de logs reais de worktrees Git descartáveis, execute
`cargo test -p mangodisk-core codex_real_git_worktree_deletion_and_diagnostics -- --ignored --nocapture --test-threads=1`.
Com Codex ou ChatGPT em execução, este teste verifica a proteção do aplicativo ativo e então injeta estados
determinísticos de processos para cenários de falha e ociosidade; validação e exclusão Git permanecem reais.
Ele nunca seleciona worktrees existentes do usuário nem encerra aplicativos em execução.

## Texto voltado ao usuário

Os dados de execução de regras e a apresentação da UI permanecem separados. Entradas de locale são opcionais no nível do schema porque o MangoDisk pode derivar um nome fallback legível a partir do ID da regra. Para uma contribuição completa voltada ao usuário, adicione `name`, `description` e `impact` em `cleanupRules.entries.<rule-id>` em todos os arquivos compatíveis sob [`src/locales`](../../../../src/locales). Se você não puder fornecer uma tradução confiável, mencione isso no pull request em vez de adicionar texto traduzido por máquina sem revisão.

## Validação

Execute as verificações focadas de fonte e schema durante o desenvolvimento:

```sh
pnpm check:rule-sources
cargo test --manifest-path src-tauri/Cargo.toml -p mangodisk-core declarative_schema
cargo test --manifest-path src-tauri/Cargo.toml -p mangodisk-core project_artifact_schema
```

Antes de abrir um pull request, execute as verificações do repositório:

```sh
pnpm check
cargo test --manifest-path src-tauri/Cargo.toml -p mangodisk-core
```

O build valida recursivamente todos os recursos TOML, incluindo campos de schema, variáveis de plataforma, risco, ciclo de vida, correspondências, limites de raiz, aplicabilidade, política de processos e sobreposição de catálogo. Falhas de validação incluem o arquivo de origem e o limite rejeitado. Não contorne uma falha com uma raiz mais ampla, uma correspondência mais fraca ou um branch Rust dedicado para um único ID de regra.

## Checklist de pull request

- A regra usa o schema correto de sistema de arquivos ou de artefato de projeto.
- Documentação oficial ou evidência reproduzível confirma o limite de limpeza.
- A regra exclui configurações, credenciais, código-fonte, conteúdo pessoal, bancos de dados e outros dados duráveis.
- IDs, caminhos, categorias, plataformas, riscos e versões seguem o schema.
- Aplicabilidade e correspondências são tão restritas quanto praticável.
- Texto voltado ao usuário fica em recursos de locale, não no TOML.
- Comandos de validação focados e completos passam em todas as plataformas afetadas, ou o pull request indica claramente qual plataforma não pôde ser validada.
