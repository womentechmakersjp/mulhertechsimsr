function byId(id){ return document.getElementById(id); }
function byClass(classe){ return document.getElementsByClassName(classe); }
function byTag(tag){ return document.getElementsByTagName(tag); }
function byName(name){ return document.getElementByName(name); }

function setPropBy(selectorType, selectorName, index, prop, valor) {
    
    switch(selectorType){
        case "id": elements = [byId(selectorName)]; break;
        case "class": elements = byClass(selectorName); break;
        case "tag": elements = byTag(selectorName); break;
        case "name": elements = byName(selectorName); break;
        case "children": elements = byId(selectorName).children; break;
    }
    
    if(index){
        index.forEach(function (el) {
            elements[el].style[prop] = valor;
        });
    } else {
        for(el = 0; el < elements.length; el++){
             elements[el].style[prop] = valor;
        }
    }
}

function getPropBy(selectorType, selectorName, index, prop) {
    var props;
    switch(selectorType){
        case "id": elements = byId(selectorName); break;
        case "class": elements = byClass(selectorName); break;
        case "tag": elements = byTag(selectorName); break;
        case "name": elements = byName(selectorName); break;
        case "children": elements = byId(selectorName).children; break;
    }
    
    if(index){
        index.forEach(function (el) {
            props[el] = elements[el].style[prop];
        });
    } else {
        for(el = 0; el < elements.length; el++){
              props[el] = elements[el].style[prop];
        }
    }
    
    return props;
    
}

window.addEventListener("load", initTheme);
var btnScroll;
function initTheme(){
    byId("loading").style.opacity = "0";
    setTimeout(function(){
        document.body.style.overflow = "auto";
        document.body.removeChild(byId("loading"));
    }, 1000);
    
    initFixedMenu();
    resize();
    
    initSlider();
    
}

window.addEventListener("resize", resize);
function resize(){
    setPropBy("id", "slider", false, "height", window.innerHeight + "px");
    setPropBy("class", "cabecalho-secao", false, "height", (window.innerHeight * 25 / 100) + "px");
    setPropBy("class", "cabecalho-secao", false, "padding", ((window.innerHeight * 25 / 100) * 20 / 100) + "px 0");
    setPropBy("class", "barra-seta", false, "height", ((window.innerHeight * 25 / 100) * 20 / 100) + "px");
    setPropBy("class", "seta", false, "borderWidth", ((window.innerHeight * 25 / 100) * 20 / 100) + "px");
    setPropBy("class", "cabecalho-img", false, "width", "auto");
}


//MENU FIXO
var btnScroll, menutopo
function initFixedMenu(){

    btnScroll = byClass("btn-scroll");
    btnScrollEvent("add");

    menutopo = byId("menu-principal");
    var menutopoTop = menutopo.offsetTop;
    window.addEventListener("scroll", function(){ 
        saveScrollAtual();
        isFixed([menutopo], window.innerHeight - (menutopo.offsetHeight * 2)); 
    });

}

//checa se o item deve ficar fixo ou não de acordo com a altura da rolagem da página
function isFixed(els, itemTop){
    els.forEach(function(el){
        if(pageYOffset < itemTop + el.offsetHeight){ el.setAttribute("class", "unfixed"); } 
        else if(pageYOffset >= itemTop + el.offsetHeight){ el.setAttribute("class", "fixed");}
    });
}

//ativa ou desativa os botões (da variavel btnScroll) da rolagem suave
function btnScrollEvent(evento){
    switch(evento){
        case "add": for(b=0; b<btnScroll.length; b++){
            /*if(!btnScroll[b].getAttribute("name")){
                destino = btnScroll[b].children[0].getAttribute("href").split("#")[1];
                btnScroll[b].children[0].setAttribute("name", destino);
                btnScroll[b].children[0].removeAttribute("href");
            }*/
            btnScroll[b].addEventListener("click", rlSuave);
        } break;
        case "remove": for(b=0; b<btnScroll.length; b++){ btnScroll[b].removeEventListener("click", rlSuave); } break;
    }
}

// ROLAGEM SUAVE
var scrollInterval, destino;
var scrollAtual = 0, scrollDestino = 0, scrolling = 0, duracao = 1250, currentTime = 0, increment = 20;
function rlSuave(e){
    e.preventDefault();

    if(e.target != undefined){ destino = e.target.getAttribute("name");}
    else { destino = e;}

    btnScrollEvent("remove");
    
    //até onde o scroll vai
    scrollDestino = (byId(destino).offsetTop - parseInt(window.getComputedStyle(menutopo, null).height));
    //de onde o scroll comeca
    scrollInicio = scrollAtual;
    
    //diferenca entre inicio e destino
    var diferenca = scrollDestino - scrollAtual;

    scrollInterval = setInterval(function(){
        currentTime += increment;
        scrolling = Math.easeInOutQuad(currentTime, scrollInicio, diferenca, duracao);
        window.scrollTo(0, scrolling);

        if (currentTime > duracao) {
            btnScrollEvent("add");
            currentTime = 0;
            clearInterval(scrollInterval);
            window.scrollTo(0, scrollDestino);
        }
    }, 20);
}

//t = current time, b = start value, c = change in value, d = duration
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d; 	return c*t*t + 1 + b;
};

function saveScrollAtual(){ scrollAtual = pageYOffset; }

//SLIDER
var interval, sliders, ls;

//Prepara estado inicial do slider
function initSlider() {
    sliders = {'slider' : 0}
    slider = byId("slider");

    if (slider) {

        slides = slider.children[1].children;

        slider.children[0].addEventListener("click", sliderClick);
        slider.children[2].addEventListener("click", sliderClick);

        marginShow = "0";
        marginHide = "100%";

        //Detecta quantos slides existem
        limite = slides.length;
        slider.setAttribute("data-limite", limite);

        //Loop: todos os slides desativados
        for (b = 0; b < limite; b++) {
            slides[b].style.left = marginHide;
        }

        slides[0].style.transition = "left 1s 0";
        slides[0].style.left = marginShow;

        for (m = 0; m < slides.length; m++) {
            slides[m].addEventListener("mouseover", function () {
                if (interval) {
                    clearInterval(interval);
                    interval = false;
                }

            });
            slides[m].addEventListener("mouseout", function () {
                if (!interval) {
                    sliderInterval();
                }
            });
        }

        slider.onfocus = function () {
            if (!interval) {
                sliderInterval();
            }
        }
        
        slider.onblur = function () {
            if (interval) {
                clearInterval(interval);
                interval = false;
            }
        }

        //Sliderpie!
        sliderInterval();
    }
}


function sliderInterval() {
    interval = setInterval(
        function () {
            sliderPie("slider", "left", getAtual("slider"), loopProximoSlide("slider", "left", getAtual("slider") + 1));
        }, 3000
    );
}

function loopProximoSlide(pai, direcao, proximo) {
    limite = byId(pai).getAttribute("data-limite");

    switch (direcao) {
    case "left":
        if (proximo == limite) {
            proximo = 0;
        };
        break;
    case "right":
        if (proximo < 0) {
            proximo = limite - 1;
        }
        break;
    }

    return proximo;
}

// Sliderpie!
function sliderPie(pai, direcao, atual, proximo) {
    slides = byId(pai).children[1].children;

    clearInterval(interval);

    //prepara slides
    slides[proximo].style.transition = "";
    slides[atual].style.transition = "left 1s 0.05s";

    switch (direcao) {
    case "left":
        //move o atual para a esquerda
        slides[atual].style.left = "-" + marginHide;
        //posiciona o próximo à direita
        slides[proximo].style.left = marginHide;

        sliders[pai] = proximo;
        break;
    case "right":
        //move o atual para a direita
        slides[atual].style.left = marginHide;
        // posiciona o próximo à esquerda
        slides[proximo].style.left = "-" + marginHide;

        sliders[pai] = proximo;
        break;
    }

    // move o slide para direita ou esquerda
    setTimeout(function () {
        slides[sliders[pai]].style.transition = "left 1s";
        slides[sliders[pai]].style.left = marginShow;
    }, 10);

    //Recomece o intervalo
    sliderInterval();

}

// Quando há clique
function sliderClick(e) {
    //Limpe o intervalo para recomeçar a contagem de tempo
    clearInterval(interval);

    var direcao = e.target.getAttribute("class");
    var pai = e.target.parentNode.id;

    atual = getAtual(pai);

    switch (direcao) {
        case ("left"):
            var prox = atual + 1;
            break;
        case ("right"):
            var prox = atual - 1;
            break;
    }
    sliderPie(pai, direcao, atual, loopProximoSlide(pai, direcao, prox), prox);

}

function getAtual(pai) { return sliders[pai]; }