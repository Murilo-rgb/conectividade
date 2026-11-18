/* =========================================================
   Conectividade · Central de Relatórios
   Renderização, busca, filtros, favoritos e tema.

   Depende de: js/reports.js (window.CATALOGO)
   ========================================================= */
(function () {
  "use strict";

  var CATALOGO = window.CATALOGO;

  if (!CATALOGO || !CATALOGO.grupos) {
    return;
  }

  var CHAVE_TEMA = "conectividade:tema";
  var CHAVE_FIXADOS = "conectividade:fixados";

  /* Ícones em SVG inline — nenhuma dependência externa */
  var SVG = {
    engrenagem:
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.08a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.08a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.08a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    calendario:
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M8 2.5v4M16 2.5v4M3 10h18"/><path d="M8 14.5h3M8 18h6"/></svg>',
    camadas:
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5 2.5 7.5 12 12.5l9.5-5z"/><path d="m2.5 12.5 9.5 5 9.5-5"/><path d="m2.5 17.5 9.5 5 9.5-5"/></svg>',
    estrela:
      '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="m12 3.6 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 10l6.1-.9z"/></svg>',
    estrelaCheia:
      '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"><path d="m12 3.6 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 10l6.1-.9z"/></svg>',
    copiar:
      '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11.5" height="11.5" rx="2.5"/><path d="M6.5 15h-1A2.5 2.5 0 0 1 3 12.5v-7A2.5 2.5 0 0 1 5.5 3h7A2.5 2.5 0 0 1 15 5.5v1"/></svg>',
    abrir:
      '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4 11 13"/><path d="M19 14v4.5A2.5 2.5 0 0 1 16.5 21h-11A2.5 2.5 0 0 1 3 18.5v-11A2.5 2.5 0 0 1 5.5 5H10"/></svg>',
    busca:
      '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg>',
    sol:
      '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"/></svg>',
    lua:
      '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>'
  };

  var estado = {
    busca: "",
    filtro: "todos",
    fixados: lerFixados()
  };

  /* Índice id -> relatório, para as ações dos itens */
  var INDICE = {};
  CATALOGO.grupos.forEach(function (grupo) {
    grupo.relatorios.forEach(function (relatorio) {
      INDICE[relatorio.id] = relatorio;
    });
  });

  var elementos = {
    busca: document.getElementById("busca"),
    filtros: document.getElementById("filtros"),
    paineis: document.getElementById("paineis"),
    contador: document.getElementById("contador-total"),
    botaoTema: document.getElementById("btn-tema"),
    toasts: document.getElementById("toasts"),
    atualizacao: document.getElementById("rodape-atualizacao")
  };

  /* ---------- Utilidades ---------- */
  function lerFixados() {
    try {
      var bruto = window.localStorage.getItem(CHAVE_FIXADOS);
      var lista = bruto ? JSON.parse(bruto) : [];
      return Object.prototype.toString.call(lista) === "[object Array]" ? lista : [];
    } catch (erro) {
      return [];
    }
  }

  function salvarFixados() {
    try {
      window.localStorage.setItem(CHAVE_FIXADOS, JSON.stringify(estado.fixados));
    } catch (erro) {
      /* armazenamento indisponível: os fixados valem só nesta sessão */
    }
  }

  function estaFixado(id) {
    return estado.fixados.indexOf(id) !== -1;
  }

  function normalizar(texto) {
    return String(texto || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function escapar(texto) {
    return String(texto)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function urlCurta(url) {
    try {
      var partes = new URL(url);
      return partes.host + partes.pathname;
    } catch (erro) {
      return url;
    }
  }

  function totalRelatorios() {
    return CATALOGO.grupos.reduce(function (soma, grupo) {
      return soma + grupo.relatorios.length;
    }, 0);
  }

  function combina(relatorio, grupo, termo) {
    if (estado.filtro === "fixados" && !estaFixado(relatorio.id)) {
      return false;
    }
    if (!termo) {
      return true;
    }
    return normalizar(relatorio.nome + " " + relatorio.descricao + " " + grupo.nome).indexOf(termo) !== -1;
  }

  /* ---------- Marcação ---------- */
  function itemHtml(relatorio) {
    var fixado = estaFixado(relatorio.id);
    var url = escapar(relatorio.url);
    var nome = escapar(relatorio.nome);

    var acoes =
      '<div class="relatorio__acoes">' +
        '<button type="button" class="acao' + (fixado ? " acao--ativo" : "") + '"' +
          ' data-acao="fixar" data-id="' + escapar(relatorio.id) + '"' +
          ' aria-pressed="' + (fixado ? "true" : "false") + '"' +
          ' title="' + (fixado ? "Remover dos fixados" : "Fixar no topo da divisão") + '"' +
          ' aria-label="' + (fixado ? "Remover " : "Fixar ") + nome + '">' +
          (fixado ? SVG.estrelaCheia : SVG.estrela) +
        "</button>" +
        '<button type="button" class="acao" data-acao="copiar" data-id="' + escapar(relatorio.id) + '"' +
          ' title="Copiar link" aria-label="Copiar link de ' + nome + '">' +
          SVG.copiar +
        "</button>" +
        '<a class="acao" href="' + url + '" target="_blank" rel="noopener noreferrer"' +
          ' title="Abrir em nova aba" aria-label="Abrir ' + nome + ' em nova aba">' +
          SVG.abrir +
        "</a>" +
      "</div>";

    return (
      '<li class="relatorio' + (fixado ? " relatorio--fixado" : "") + '">' +
        '<a class="relatorio__link" href="' + url + '" target="_blank" rel="noopener noreferrer">' +
          '<span class="relatorio__nome">' +
            nome +
            (fixado ? '<span class="relatorio__selo">Fixado</span>' : "") +
          "</span>" +
          '<span class="relatorio__descricao">' + escapar(relatorio.descricao) + "</span>" +
          '<span class="relatorio__url" title="' + url + '">' + escapar(urlCurta(relatorio.url)) + "</span>" +
        "</a>" +
        acoes +
      "</li>"
    );
  }

  function renderFiltros() {
    var chips = [{ id: "todos", nome: "Todos", qtd: totalRelatorios() }];

    CATALOGO.grupos.forEach(function (grupo) {
      chips.push({ id: grupo.id, nome: grupo.nome, qtd: grupo.relatorios.length });
    });

    chips.push({ id: "fixados", nome: "Fixados", qtd: estado.fixados.length });

    elementos.filtros.innerHTML = chips
      .map(function (chip) {
        return (
          '<button type="button" class="chip" data-filtro="' + chip.id + '"' +
            ' aria-pressed="' + (estado.filtro === chip.id ? "true" : "false") + '">' +
            escapar(chip.nome) +
            '<span class="chip__qtd">' + chip.qtd + "</span>" +
          "</button>"
        );
      })
      .join("");
  }

  function renderPaineis() {
    var termo = normalizar(estado.busca);
    var gruposVisiveis = CATALOGO.grupos.filter(function (grupo) {
      return estado.filtro === "todos" || estado.filtro === "fixados" || estado.filtro === grupo.id;
    });

    var html = "";

    gruposVisiveis.forEach(function (grupo) {
      var itens = grupo.relatorios.filter(function (relatorio) {
        return combina(relatorio, grupo, termo);
      });

      if (!itens.length) {
        return;
      }

      /* relatórios fixados sobem para o topo da própria divisão */
      itens.sort(function (a, b) {
        return (estaFixado(b.id) ? 1 : 0) - (estaFixado(a.id) ? 1 : 0);
      });

      var rotuloQtd = itens.length === 1 ? "1 relatório" : itens.length + " relatórios";

      html +=
        '<section class="painel" aria-labelledby="painel-' + grupo.id + '"' +
          ' style="--painel-cor: var(--' + grupo.id + '); --painel-suave: var(--' + grupo.id + '-suave);">' +
          '<header class="painel__cabecalho">' +
            '<span class="painel__icone" aria-hidden="true">' +
              (SVG[grupo.icone] || SVG.camadas) +
            "</span>" +
            '<div class="painel__texto">' +
              '<h2 class="painel__nome" id="painel-' + grupo.id + '">' + escapar(grupo.nome) + "</h2>" +
              '<p class="painel__descricao">' + escapar(grupo.descricao) + "</p>" +
            "</div>" +
            '<span class="painel__qtd" title="' + rotuloQtd + '">' + itens.length + "</span>" +
          "</header>" +
          '<ul class="lista">' + itens.map(itemHtml).join("") + "</ul>" +
        "</section>";
    });

    if (!html) {
      var mensagem;

      if (estado.filtro === "fixados" && !estado.fixados.length) {
        mensagem = "Nenhum relatório fixado ainda. Use a estrela de um relatório para fixá-lo no topo da divisão.";
      } else if (estado.busca) {
        mensagem = "Nenhum relatório encontrado para <strong>" + escapar(estado.busca) + "</strong>.";
      } else {
        mensagem = "Nenhum relatório disponível nesta divisão.";
      }

      html =
        '<div class="vazio">' +
          SVG.busca +
          "<p>" + mensagem + "</p>" +
          '<button type="button" class="chip" data-acao="limpar">Limpar filtros</button>' +
        "</div>";
    }

    elementos.paineis.innerHTML = html;
  }

  function render() {
    renderFiltros();
    renderPaineis();
  }

  /* ---------- Ações dos itens ---------- */
  function focarAcao(id, acao) {
    var alvo = elementos.paineis.querySelector('[data-acao="' + acao + '"][data-id="' + id + '"]');
    if (alvo) {
      alvo.focus();
    }
  }

  function alternarFixado(id) {
    var posicao = estado.fixados.indexOf(id);
    var fixando = posicao === -1;

    if (fixando) {
      estado.fixados.push(id);
    } else {
      estado.fixados.splice(posicao, 1);
    }

    salvarFixados();
    render();
    focarAcao(id, "fixar");

    mostrarToast(fixando ? "Relatório fixado no topo da divisão." : "Relatório removido dos fixados.");
  }

  function mostrarToast(mensagem) {
    var toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = mensagem;
    elementos.toasts.appendChild(toast);

    window.setTimeout(function () {
      toast.classList.add("toast--saindo");
      window.setTimeout(function () {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 220);
    }, 2400);
  }

  function copiarTexto(texto) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(texto).then(
        function () {
          return true;
        },
        function () {
          return copiarTextoLegado(texto);
        }
      );
    }

    return Promise.resolve(copiarTextoLegado(texto));
  }

  /* Fallback para file:// ou HTTP sem contexto seguro */
  function copiarTextoLegado(texto) {
    var area = document.createElement("textarea");
    area.value = texto;
    area.setAttribute("readonly", "readonly");
    area.style.position = "fixed";
    area.style.top = "-1000px";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();

    var copiou = false;
    try {
      copiou = document.execCommand("copy");
    } catch (erro) {
      copiou = false;
    }

    document.body.removeChild(area);
    return copiou;
  }

  function copiarLink(relatorio) {
    copiarTexto(relatorio.url).then(function (copiou) {
      mostrarToast(
        copiou
          ? "Link copiado: " + relatorio.nome
          : "Não foi possível copiar. Abra o relatório e copie pela barra de endereços."
      );
    });
  }

  /* ---------- Tema claro / escuro ---------- */
  function aplicarTema(tema, persistir) {
    document.documentElement.setAttribute("data-tema", tema);

    elementos.botaoTema.innerHTML = tema === "escuro" ? SVG.sol : SVG.lua;
    elementos.botaoTema.setAttribute("aria-label", tema === "escuro" ? "Ativar tema claro" : "Ativar tema escuro");
    elementos.botaoTema.setAttribute("title", tema === "escuro" ? "Tema claro" : "Tema escuro");

    if (persistir) {
      try {
        window.localStorage.setItem(CHAVE_TEMA, tema);
      } catch (erro) {
        /* preferência válida apenas nesta sessão */
      }
    }
  }

  function temaInicial() {
    try {
      var salvo = window.localStorage.getItem(CHAVE_TEMA);
      if (salvo === "claro" || salvo === "escuro") {
        return salvo;
      }
    } catch (erro) {
      /* segue a preferência do sistema */
    }

    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "escuro"
      : "claro";
  }

  function alternarTema() {
    var atual = document.documentElement.getAttribute("data-tema");
    aplicarTema(atual === "escuro" ? "claro" : "escuro", true);
  }

  /* ---------- Eventos ---------- */
  function ligarEventos() {
    elementos.busca.addEventListener("input", function (evento) {
      estado.busca = evento.target.value;
      renderPaineis();
    });

    elementos.filtros.addEventListener("click", function (evento) {
      var botao = evento.target.closest("[data-filtro]");
      if (!botao) {
        return;
      }
      estado.filtro = botao.getAttribute("data-filtro");
      render();
    });

    elementos.paineis.addEventListener("click", function (evento) {
      var alvo = evento.target.closest("[data-acao]");
      if (!alvo) {
        return;
      }

      var acao = alvo.getAttribute("data-acao");
      var id = alvo.getAttribute("data-id");

      if (acao === "limpar") {
        estado.busca = "";
        estado.filtro = "todos";
        elementos.busca.value = "";
        render();
        return;
      }

      if (acao === "fixar" && id) {
        alternarFixado(id);
        return;
      }

      if (acao === "copiar" && id && INDICE[id]) {
        copiarLink(INDICE[id]);
      }
    });

    elementos.botaoTema.addEventListener("click", alternarTema);

    document.addEventListener("keydown", function (evento) {
      var campoAtivo = document.activeElement;
      var digitando = /^(INPUT|TEXTAREA|SELECT)$/.test(campoAtivo.tagName);

      if ((evento.ctrlKey || evento.metaKey) && evento.key.toLowerCase() === "k") {
        evento.preventDefault();
        elementos.busca.focus();
        elementos.busca.select();
        return;
      }

      if (evento.key === "Escape" && (campoAtivo === elementos.busca || digitando)) {
        elementos.busca.value = "";
        estado.busca = "";
        renderPaineis();

        if (campoAtivo === elementos.busca) {
          elementos.busca.blur();
        }
      }
    });
  }

  /* ---------- Início ---------- */
  function formatarData(iso) {
    var partes = String(iso || "").split("-");
    if (partes.length !== 3) {
      return iso || "";
    }
    return partes[2] + "/" + partes[1] + "/" + partes[0];
  }

  function iniciar() {
    aplicarTema(temaInicial(), false);

    if (elementos.contador) {
      var total = totalRelatorios();
      elementos.contador.textContent = total + (total === 1 ? " relatório" : " relatórios");
    }

    if (elementos.atualizacao && CATALOGO.atualizadoEm) {
      elementos.atualizacao.textContent = "catálogo atualizado em " + formatarData(CATALOGO.atualizadoEm);
    }

    ligarEventos();
    render();
  }

  iniciar();



})();
