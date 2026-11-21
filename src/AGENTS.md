# Diretrizes de Frontend

Este arquivo se aplica apenas a `src/` e herda as regras gerais do repositório em [`../AGENTS.md`](../AGENTS.md).

## Limites e layout

- `pages/<domain>/` contém visualizações de rota e componentes usados apenas por aquela página.
- `layouts/` contém o shell da aplicação e componentes de layout compartilhados entre páginas; layouts não são páginas.
- `components/custom/` contém primitivas de UI reutilizáveis de propriedade do projeto.
- `components/icons/` contém componentes de ícone de propriedade do projeto.
- `components/ui/` é código Shadcn-Vue gerado. Não o edite para comportamento de todo o projeto; configure-o ou encapsule-o em `components/custom/`.
- `stores/` possui o estado de UI e de fluxo de trabalho de um domínio. Um Store pode coordenar serviços, mas não deve copiar o estado completo de outro Store.
- `lib/services/` possui efeitos colaterais: invocações Tauri, persistência, integração com a plataforma, APIs de navegador, diálogos e assinaturas de eventos.
- `lib/utils/` possui apenas funções determinísticas. Utilitários não devem ler Stores, invocar Tauri, acessar armazenamento nem mutar estado externo.
- `lib/models/` contém protocolos e constantes de propriedade do frontend, divididos por domínio concreto. Código de negócio importa o arquivo proprietário diretamente; adaptadores estreitos gerados para componentes não são APIs públicas.

Modelos, serviços e utilitários usam subdiretórios de domínio correspondentes, como `cleanup/`, `storage/`, `applications/` e `system-resources/`. Mantenha os testes ao lado do módulo que eles exercitam. Coloque cálculos específicos de domínio no diretório de utilitários proprietário; reutilize operações de coleção independentes de domínio de `lib/utils/collections/` e cálculos de exibição de `lib/utils/presentation/`. Um utilitário não deve descobrir a plataforma, ler o relógio nem possuir um fluxo de trabalho; passe esses fatos como entradas a partir de seu adaptador.

Páginas podem apresentar vários domínios juntos, mas a orquestração compartilhada de produto deve permanecer explícita; não crie um `manager` de frontend nem um Store global contendo todos os fluxos de trabalho.

## Vue e TypeScript

- Use Vue 3 `<script setup lang="ts">` e TypeScript estrito. Não introduza `any`.
- Arquivos Vue de propriedade do projeto usam `kebab-case`; componentes customizados reutilizáveis e arquivos de ícone usam o prefixo `md-` para que sua propriedade seja reconhecível como código MangoDisk.
- Prefira props e emits para comunicação entre componentes. Não use provide/inject como barramento de eventos oculto.
- Stores Pinia usam a Options API (`state`, `getters`, `actions`).
- Prefira funções de módulo exportadas ou métodos estáticos de serviço para adaptadores sem estado. Use uma instância de serviço própria quando ela tiver estado de ciclo de vida, dependências substituíveis ou exigir isolamento de testes.
- Evite novos composables e helpers genéricos `use*` quando um Store nomeado, um serviço estático ou um utilitário puro oferecer navegação mais clara na IDE.
- Importe código de negócio de seu arquivo concreto. Os índices mínimos exigidos pelo código Shadcn gerado não são APIs públicas do projeto.
- Não duplique tipos de protocolo Rust adivinhando. Quando os bindings de protocolo são mantidos manualmente, atualize Rust, TypeScript, serviços, Stores e testes de compatibilidade em uma única alteração.

## Texto, status e logs

- Todas as strings voltadas ao usuário pertencem aos recursos de locale. Atualize todos os locales suportados na mesma alteração.
- Registre novos locales em `lib/models/settings/settings.ts`, `i18n.ts`, `locales/modules/`, nas verificações de build e de locale e em `../src-tauri/src/services/native_labels.rs`. Mantenha os argumentos de interpolação e os significados de segurança alinhados com os recursos atuais em inglês; use formulações naturais no idioma local.
- Cada regra de limpeza de catálogo precisa de um nome, uma descrição e um impacto não vazios em cada locale suportado; `pnpm check:i18n` verifica a cobertura.
- As chaves de objeto de locale devem ser únicas. A mesma verificação reporta ambas as localizações de origem antes que a análise do JSON possa descartar uma duplicata.
- Constantes são de propriedade do domínio. Não mova toda constante não relacionada para um novo arquivo global de constantes.
- Renderize comportamento a partir de códigos tipados de status, risco, capacidade e razão. Mensagens de backend em formato livre são diagnósticos, não fluxo de controle de UI.
- Use o serviço de logger do projeto para eventos significativos de ciclo de vida, falha e recuperação. Não use `console.*` bruto em caminhos de produção.
- Os logs de frontend devem reter contexto útil de erro, nomes/caminhos de objetos, IDs de operação e resultados por meio de `LoggerService`. Exclua credenciais, tokens, conteúdos de documentos e metadados não relacionados. Escape e limite o contexto serializado; mantenha o tratamento de erro voltado ao usuário baseado em códigos tipados.
- Não localize recursos de regra. Resolva IDs de regra estáveis e códigos de diagnóstico no limite de apresentação.

## Estilização e interação

- `assets/themes/base-tokens.css` possui identidade de marca compartilhada, tipografia, cores de ícone nativas e derivações semânticas. Ele não deve definir uma paleta de superfície selecionável.
- `assets/themes/mango.css` e `assets/themes/warm-gray.css` possuem paletas claras e escuras independentes. Seletores de tema devem ser mutuamente exclusivos e corresponder apenas ao seu próprio ID; nenhum tema pode exigir a folha de estilo do outro para renderizar corretamente. O Mango também lida com o estado inicial antes do carregamento das preferências; preferências inválidas persistidas são normalizadas para o Mango.
- `assets/main.css` importa os tokens compartilhados e ambas as paletas, mapeia tokens para o Tailwind e possui estilos globais de layout e interação. Componentes consomem tokens semânticos em vez de inspecionar IDs de tema.
- Use `text-primary-text` e `text-destructive-text` para rótulos e ícones independentes; `primary` e `destructive` são cores de controle preenchido combinadas com seus tokens `*-foreground`. A verificação do sistema de estilos reforça essa distinção.
- A variante `dark:` do Tailwind deve seguir o atributo `data-theme` da aplicação para que ajustes manuais de brilho permaneçam independentes da preferência do sistema operacional.
- O projeto usa Tailwind CSS 4.3. Verifique a sintaxe com a documentação da v4.
- Prefira utilitários responsivos e consultas de contêiner nomeadas em vez de consultas de mídia por viewport específicas de página. `shell:` é reservado para a navegação do shell da aplicação.
- Componentes reutilizáveis preenchem ou encolhem dentro de seu pai. Tamanhos exatos são apropriados para alturas estáveis de controles, caixas de ícone, alvos de toque e ativos com proporção intrínseca — não para larguras de layout de página.
- Coloque o comportamento de barra de rolagem compartilhado entre páginas em `assets/main.css`; use `scrollbar-hidden` ou `scrollbar-stable` nos componentes.
- Em CSS com escopo, adicione `@reference "@assets/main.css"` antes de `@apply`.
- Botões e estados de hover não devem transladar, escalar nem alterar dimensões de layout. Use feedback de cor, borda ou sombra que não possa causar movimento da página.
- Mantenha cabeçalhos de página e o comportamento de altura de conteúdo consistentes por meio de componentes de shell de propriedade do projeto.
- Use `MdSettingsGroup` e `MdSettingsRow` para grupos e linhas de páginas de configurações. Esses componentes possuem espaçamento, alinhamento, tipografia, controles responsivos e feedback de hover/foco; os chamadores possuem estado e ações de negócio.
- Use o Tooltip do Shadcn-Vue (ou `MdTooltip`) para dicas; não use atributos `title` nativos de HTML. Props de título de componente para cabeçalhos visíveis não têm relação com isso.
- Janelas modais usam `Dialog`, `MdDialogContent`, `MdDialogHeader` e `MdDialogFooter`; operações ativas usam `MdOperationDialog`. Mantenha a dispensa separada do cancelamento e retenha a confirmação para o cancelamento destrutivo. Áreas de trabalho de progresso locais da página e painéis flutuantes não modais retêm seus próprios contratos de interação.
- Nunca coloque markup SVG bruto em um template. Adicione ou reutilize um componente em `components/icons/`.

## Validação

Para alterações de frontend, execute:

```sh
pnpm check:frontend
```

Execute também `pnpm check` quando uma alteração tocar protocolos voltados ao Rust, bindings gerados, eventos, configuração ou empacotamento. Teste os fluxos de UI afetados em ambos os temas e em todos os locales suportados quando texto ou layout mudar, e verifique o tamanho mínimo da janela para alterações responsivas.
