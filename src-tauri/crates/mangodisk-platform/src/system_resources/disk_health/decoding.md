# Decodificação SMART

As leituras de integridade permanecem somente para leitura e usam o cache residente de cinco minutos. A análise é compartilhada entre macOS e Windows; a identificação de modelo nunca exige um helper privilegiado, um programa de monitoramento instalado ou uma consulta de modelo online.

## Campos padrão versus campos específicos do fabricante

O [log de integridade NVMe](https://learn.microsoft.com/en-us/windows/win32/api/nvme/ns-nvme-nvme_health_info_log) e a [Especificação Base NVMe, Log de Informações SMART / Integridade](https://nvmexpress.org/wp-content/uploads/NVM-Express-Base-Specification-2.0d-2024.01.11-Ratified.pdf) definem deslocamentos e unidades. As unidades de dados lidos/gravados contam 512.000 bytes por unidade; zero significa não informado. Os demais contadores de vida útil permanecem como strings decimais para que o JSON não perca precisão de 128 bits. Campos adicionais incluem contagens de comandos do host, minutos de ocupação do controlador, desligamentos não seguros, entradas do log de erros, durações de aviso térmico, oito sensores de temperatura opcionais e contadores de gerenciamento térmico. Temperaturas inválidas ou ausentes permanecem indisponíveis.

[INCITS TR-54 (Descrições de Atributos SMART)](https://webstore.ansi.org/standards/incits/INCITSTR542021) documenta as relações entre as estatísticas de dispositivos ATA e os atributos SMART; isso não elimina a necessidade de identificar codificações específicas do fabricante. O setor de atributos do ATA possui trinta slots de doze bytes e um checksum. Os significados dos atributos e as unidades brutas são específicos do fabricante. Preserve cada slot não vazio, incluindo IDs desconhecidos, flags, valores normalizados atual/pior, seis bytes brutos e o byte reservado final. Rejeite tabelas truncadas, corrompidas, vazias ou com IDs duplicados. Bytes brutos nunca são interpretados implicitamente como uma porcentagem de integridade.

A [previsão de falha](https://learn.microsoft.com/en-us/windows-hardware/drivers/ddi/ntddstor/ni-ntddstor-ioctl_storage_predict_failure) do Windows fornece tanto um flag de status quanto um setor específico do fabricante. Interprete este último como ATA apenas em um barramento ATA/SATA identificado. O status de gerenciamento SCSI não implica atributos ATA. O macOS usa sua interface de leitura ATA SMART existente e os metadados de produto do IOKit. Nenhum número de série é coletado.

## Perfis ATA verificados

| Perfil | Seleção | Decodificação do resumo |
| --- | --- | --- |
| Samsung de consumo | Famílias explícitas 830/840/850/860/870 | 9: horas; 12: ciclos; 177: vida restante normalizada; 241/242: unidades de 512 bytes |
| Silicon Motion legado | Prefixo de tabela legado completo e um modelo compatível; Acer AS500A também exige firmware verificado | 9: horas baixas de 24 bits; 12: ciclos; 169: percentual restante bruto; 241/242: E/S do host; 245/246: gravações TLC/SLC, todas em unidades de 32 MiB |
| Seagate BarraCuda | Séries CMR/SMR explícitas | 9: horas com tratamento de bytes compactados específico do modelo; 12: ciclos; 241/242: setores lógicos |
| Desconhecido | Nenhuma correspondência verificada | Apenas atributos brutos e temperatura válida; sem vida útil ou totais de bytes inventados |

Perfis conhecidos também decodificam os contadores disponíveis de setor/bloco, apagamento, programação, erro, ciclo de carga e CRC de interface com códigos explícitos de métrica/unidade. Atributos ausentes permanecem ausentes; contagens zero compatíveis permanecem zero. Não equalize contagens de blocos reservas com a porcentagem de reserva do NVMe nem contagens de erros ATA com erros de mídia/integridade de dados do NVMe. O status de previsão de falha do sistema operacional/unidade permanece separado dos contadores individuais e da vida restante estimada.

A [nota de aplicativo SMART](https://semiconductor.samsung.com/resources/others/SSD_Application_Note_SMART_final.pdf) e o [white paper de resistência](https://s7d2.scene7.com/is/content/SamsungUS/b2b/resource/2016/05/31/b2b_resource_WHP-SSD-SSDSMARTATTRIBUTES-APR16J.pdf) da Samsung descrevem seu desgaste bruto versus normalizado e as unidades de gravação fixas de 512 bytes. O [banco de dados de unidades do smartmontools](https://github.com/smartmontools/smartmontools/blob/main/drivedb/drivedb.h) documenta unidades e codificações de horas específicas por modelo. A detecção de tabela SMI legada e a interpretação de vida bruta/32 MiB são confrontadas com o [leitor do CrystalDiskInfo](https://github.com/hiyohiyo/CrystalDiskInfo/blob/master/AtaSmart.cpp). As [diretrizes da Seagate](https://github.com/Seagate/openSeaChest/wiki/Drive-Health-and-SMART) explicam por que contadores genéricos do fabricante não podem ser comparados diretamente.

Novos perfis precisam de uma definição autoritativa ou de um decodificador independente documentado, limites exatos de modelo/firmware/layout e casos de regressão para variantes não reconhecidas. A marca da unidade sozinha é insuficiente. Se o tamanho de setor lógico estiver indisponível, os totais de bytes da Seagate permanecem ausentes. Por isso, o macOS pode expor menos resumos ATA, mantendo a tabela completa de atributos.

As leituras atuais usam o schema 27. O painel exibe resumos concisos e decodificados da vida útil; a sonda de engenharia também emite a tabela ATA completa, bruta e decodificada, e os campos NVMe estendidos. Esses diagnósticos não adicionam polling.
