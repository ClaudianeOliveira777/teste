
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