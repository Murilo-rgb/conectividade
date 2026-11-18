/* =========================================================
   Conectividade · Central de Relatórios
   Catálogo de relatórios do workspace (Power BI)

   COMO MANTER ESTE ARQUIVO
   - Cada item de "grupos" é uma divisão exibida na página.
   - A ordem definida aqui é a ordem exibida na tela.
   - Para incluir/alterar um relatório, edite apenas o bloco
     correspondente: id (único), nome, descricao e url.
   - A url deve ser copiada inteira (com "ctid" e "pbi_source"),
     caso contrário o link compartilhado do Power BI não abre.
   ========================================================= */
window.CATALOGO = {
  titulo: "Conectividade",
  subtitulo: "Central de Relatórios · Power BI",
  atualizadoEm: "2026-11-13",
  grupos: [
    {
      id: "configuracao",
      nome: "Configuração",
      descricao: "Auditoria, conformidade e indicadores de configuração.",
      icone: "engrenagem",
      relatorios: [
        {
          id: "auditoria-cpe",
          nome: "Auditoria CPE",
          descricao: "Auditoria dos contatos e das configurações dos equipamentos CPE.",
          url: "https://app.powerbi.com/links/mvVrGjE_lN?ctid=d6c7d4eb-ad17-46c8-a404-f6a92cbead96&pbi_source=linkShare"
        },
        {
          id: "efetividade-rpa-modos",
          nome: "Efetividade RPA MODOS",
          descricao: "Efetividade do RPA de modos de operação.",
          url: "https://app.powerbi.com/links/T347Ft-5xk?ctid=d6c7d4eb-ad17-46c8-a404-f6a92cbead96&pbi_source=linkShare"
        },
        {
          id: "confpe",
          nome: "Relatório ConfPE",
          descricao: "Conformidade no atendimento de CPE.",
          url: "https://app.powerbi.com/links/hNzoyaX7TW?ctid=d6c7d4eb-ad17-46c8-a404-f6a92cbead96&pbi_source=linkShare"
        },
        {
          id: "eth-sdh",
          nome: "Relatório ETH e SDH",
          descricao: "Indicadores de transmissão ETH e SDH.",
          url: "https://app.powerbi.com/links/RP7_TYVZ8c?ctid=d6c7d4eb-ad17-46c8-a404-f6a92cbead96&pbi_source=linkShare"
        },
        {
          id: "gerencial-configuracao-supervisores",
          nome: "Relatório Gerencial Configuração Supervisores",
          descricao: "Visão gerencial da configuração por supervisor.",
          url: "https://app.powerbi.com/links/4nLSaPFcS3?ctid=d6c7d4eb-ad17-46c8-a404-f6a92cbead96&pbi_source=linkShare"
        },
        {
          id: "cpe-backbone-telefonia",
          nome: "Relatório CPE – Backbone – Telefonia",
          descricao: "Panorama integrado de CPE, backbone e telefonia.",
          url: "https://app.powerbi.com/links/jR3dErYFRK?ctid=d6c7d4eb-ad17-46c8-a404-f6a92cbead96&pbi_source=linkShare"
        },
        {
          id: "ociosidade-cpe",
          nome: "Relatório Ociosidade CPE",
          descricao: "Ociosidade e tempo improdutivo das equipes de CPE.",
          url: "https://app.powerbi.com/links/b0UI8ID8K1?ctid=d6c7d4eb-ad17-46c8-a404-f6a92cbead96&pbi_source=linkShare"
        }
      ]
    },
    {
      id: "agendamento",
      nome: "Agendamento",
      descricao: "Liberação, eficiência e SLA dos agendamentos.",
      icone: "calendario",
      relatorios: [
        {
          id: "liberacao",
          nome: "Relatório de Liberação",
          descricao: "Liberações de agendamento por período.",
          url: "https://app.powerbi.com/links/5WzZkI-Kwe?ctid=d6c7d4eb-ad17-46c8-a404-f6a92cbead96&pbi_source=linkShare"
        },
        {
          id: "eficiencia-agendamento-v2",
          nome: "Relatório Eficiência agendamento V2",
          descricao: "Eficiência operacional do agendamento (versão 2).",
          url: "https://app.powerbi.com/links/JlFyiYfAx8?ctid=d6c7d4eb-ad17-46c8-a404-f6a92cbead96&pbi_source=linkShare"
        },
        {
          id: "sla-tarefas-finalizadas",
          nome: "SLA Status Tarefas Finalidas",
          descricao: "SLA das tarefas por status final.",
          url: "https://app.powerbi.com/links/xJDi3eo7Ri?ctid=d6c7d4eb-ad17-46c8-a404-f6a92cbead96&pbi_source=linkShare"
        }
      ]
    },
    {
      id: "aprovisionamento",
      nome: "Aprovisionamento",
      descricao: "Horas de mobilidade e visão gerencial do aprovisionamento.",
      icone: "camadas",
      relatorios: [
        {
          id: "horas-conectividade-mobilidade",
          nome: "Controle de Horas Conectividade – Mobilidade",
          descricao: "Apontamento e controle de horas da mobilidade.",
          url: "https://app.powerbi.com/links/P6DSAYZstQ?ctid=d6c7d4eb-ad17-46c8-a404-f6a92cbead96&pbi_source=linkShare"
        },
        {
          id: "gerencial-aprovisionamento",
          nome: "Relatório Gerencial Aprovisionamento",
          descricao: "Visão gerencial do aprovisionamento.",
          url: "https://app.powerbi.com/links/lX8LW4P4eU?ctid=d6c7d4eb-ad17-46c8-a404-f6a92cbead96&pbi_source=linkShare"
        }
      ]
    }
  ]
};
