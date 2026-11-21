# Política de segurança

## Versões suportadas

Atualizações de segurança são fornecidas para a versão mais recente do MangoDisk. Versões mais antigas podem não receber correções de segurança, portanto os usuários devem atualizar para a versão disponível mais recente.

## Como relatar uma vulnerabilidade

Não divulgue uma vulnerabilidade suspeita em uma issue, discussão ou pull request público. Relate-a de forma privada por meio do GitHub Security Advisories. Inclua:

- a versão ou commit afetado;
- o sistema operacional e as permissões relevantes;
- o mínimo de etapas de reprodução;
- o limite de segurança esperado;
- o impacto observado;
- quaisquer logs após remover caminhos privados e conteúdos de arquivos.

Os mantenedores confirmarão o recebimento de um relato completo, avaliarão sua gravidade e coordenarão a divulgação após houver uma correção disponível. Bypass de autorização de limpeza, falhas em caminhos protegidos, exclusão arbitrária de arquivos, execução de comandos e divulgação de caminhos sensíveis recebem prioridade.

## Limites de segurança

O MangoDisk trata os resultados da varredura como não confiáveis até a pré-verificação. Operações destrutivas devem preservar as verificações de caminhos protegidos, a política de links e pontos de novo parse, a intenção explícita do usuário, a verificação da execução e a falha segura quando capacidades da plataforma não estão disponíveis.

Os relatos nunca devem incluir credenciais, conteúdos de arquivos pessoais, caminhos privados completos ou uma cópia sem redação de um resultado de varredura em memória.
