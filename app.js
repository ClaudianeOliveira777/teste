
const navCategorias = document.querySelector('.nav-categorias');
const subList = document.querySelector('.sub-list');

function showSubList(show){
    subList.classList.toggle('show-sublist', show);
}

[navCategorias, subList].forEach(el =>{
    el.addEventListener('mouseenter', () => showSubList(true));
    el.addEventListener('mouseleave', () => showSubList(false));
})



//Idioms

const languageSelector = document.querySelector('.language-selector');
const languageList = document.querySelector('.language-list');


// Pegando os dois idiomas como filhos da linguagem
let currentLang = languageSelector.children[0]; // div de cima (inicial)
let altLang = languageList.children[0];         // div de baixo (alternativa)




// Aplica a classe apenas no idioma alternativo
altLang.classList.add('language-selected');



languageSelector.addEventListener('click', () => {
    languageList.classList.toggle('active');
});

languageSelector.addEventListener('mouseleave', () => {
   setTimeout(() => {
    languageList.style.display = 'none';
  }, 150); // Delay para suavizar
});

// Troca os idiomas ao clicar
altLang.addEventListener('click', () => {
  // Troca os conteúdos
  const tempHTML = currentLang.innerHTML;
  currentLang.innerHTML = altLang.innerHTML;
  altLang.innerHTML = tempHTML;

  /*// Atualiza as classes
  currentLang.classList.remove('language-option');
  altLang.classList.add('language-option');*/

  // Reatribui as variáveis, já que os elementos trocaram de lugar
  [currentLang, altLang] = [altLang, currentLang];
});





//Search
const icon = document.getElementById('searchIcon');
const searchInput = document.getElementById('searchInput');

// Clica no ícone → mostra o input com foco
icon.addEventListener('click', (e) => {
  e.preventDefault(); // evita comportamento estranho no mobile
  searchInput.classList.add('active');  // agora aplicamos direto no input, não mais no container

  setTimeout(() => {
    searchInput.focus({ preventScroll: true }); //Não rolar a tela automaticamente no celular 
  }, 10);   // garante que o foco seja aplicado após o clique, evitando conflito com blur
});

// Pressionou Enter → fecha a barra (e você pode adicionar lógica de busca aqui)
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    setTimeout(() => {
      searchInput.classList.remove('active');
      searchInput.value = '';
    }, 300); // delay para permitir o envio ou visualização do resultado antes de ocultar
  }
});

// Perdeu foco → esconde a barra com pequeno delay
searchInput.addEventListener('blur', () => {
  setTimeout(() => {
    if (document.activeElement !== searchInput) {
      searchInput.classList.remove('active');
      searchInput.value = '';
    }
  }, 300); // evita que o input desapareça imediatamente, melhora UX
});



//Hamburguer somente no mobile

const hamburguerToggle = document.getElementById("hamburguer-toggle");
const menu = document.getElementById("menu");

hamburguerToggle.addEventListener("click", () => {
  hamburguerToggle.classList.toggle("active");
  menu.classList.toggle("active");
});


/*Cook Mode
let wakeLock = null;
let isCookModeActive = false;

const cookModeToggle = document.getElementById('cookModeToggle');
const cookModeSwitch = document.getElementById('cookModeSwitch');
const cookModeStatus = document.getElementById('cookModeStatus');

cookModeToggle.addEventListener('click', async () => {
    if (!isCookModeActive) {
        await enableCookMode();
    } else {
        await disableCookMode();
    }
});

async function enableCookMode() {
    try {
        if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
            isCookModeActive = true;
            updateUI();
            
            wakeLock.addEventListener('release', () => {
                isCookModeActive = false;
                updateUI();
            });
            
            console.log('Cook Mode ativado - tela não vai apagar');
        } else {
            // Fallback para navegadores sem suporte
            console.log('Wake Lock API não suportada, usando fallback');
            isCookModeActive = true;
            updateUI();
            startFallbackMode();
        }
    } catch (err) {
        console.error('Erro ao ativar Cook Mode:', err);
        alert('Não foi possível ativar o Cook Mode neste navegador');
    }
}

async function disableCookMode() {
    if (wakeLock) {
        await wakeLock.release();
        wakeLock = null;
    }
    isCookModeActive = false;
    updateUI();
    console.log('Cook Mode desativado');
}

function updateUI() {
    if (isCookModeActive) {
        cookModeSwitch.classList.add('active');
        cookModeStatus.textContent = 'Cook Mode ativo (Tela protegida)';
    } else {
        cookModeSwitch.classList.remove('active');
        cookModeStatus.textContent = 'Cook Mode (Manter tela ligada)';
    }
}
*/

  let wakeLock = null;
        let isActive = false;

        document.getElementById('cookModeToggle').addEventListener('click', async () => {
            if (!isActive) {
                try {
                    wakeLock = await navigator.wakeLock.request('screen');
                    isActive = true;
                    document.getElementById('cookModeSwitch').classList.add('active');
                    document.getElementById('cookModeStatus').textContent = 'Cook Mode ativo';
                } catch (err) {
                    console.error('Erro:', err);
                    // Mesmo sem wake lock, ativa visualmente
                    isActive = true;
                    document.getElementById('cookModeSwitch').classList.add('active');
                    document.getElementById('cookModeStatus').textContent = 'Cook Mode ativo';
                }
            } else {
                if (wakeLock) wakeLock.release();
                isActive = false;
                document.getElementById('cookModeSwitch').classList.remove('active');
                document.getElementById('cookModeStatus').textContent = 'Cook Mode (Manter tela ligada)';
            }
        });
