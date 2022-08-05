// ---/!\--- ↓ PROVISOIRE ↓ ---/!\--- (début)
localStorage.setItem('recettes', JSON.stringify([
    {
        titre: "Titre", 
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo est reiciendis alias magnam culpa doloremque nostrum amet consequuntur sed accusamus.",
        ingredients: ["Ingrédient 1", "Ingrédient 2", "Ingrédient 3", "Ingrédient 4"],
        etapes: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, ipsam!", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, ipsam!", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, ipsam!"],
        indicateurs: {
            difficulte: 2,
            duree: 3,
            prix: 1
        }
    },
    {
        titre: "2 : Titre", 
        description: "2 : Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo est reiciendis alias magnam culpa doloremque nostrum amet consequuntur sed accusamus.",
        ingredients: ["2 : Ingrédient 1", "2 : Ingrédient 2", "2 : Ingrédient 3", "2 : Ingrédient 4"],
        etapes: ["2 : Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, ipsam!", "2 : Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, ipsam!", "2 : Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, ipsam!"],
        indicateurs: {
            difficulte: 2,
            duree: 3,
            prix: 1
        }
    }
]))
// ---/!\--- ↑ PROVISOIRE ↑ ---/!\--- (fin)

// Enregistrer dans la variable "recettes" un tableau contenant toutes les recettes :
var recettes = JSON.parse(localStorage.getItem('recettes')) || [];

// Enregistrer dans des variables des nœuds HTML :
var html = document.querySelector('html');
var recherche = document.getElementById('recherche');
var liste_recettes = document.getElementById('liste-recettes');
var consultation_recette = document.getElementById('consultation-recette');
var liste = document.querySelector('#liste-recettes ul');

/**
 * Ajoute une recette vide au tableau "recettes".
 */
function ajouter_recette() {
    // 1: Ajouter un objet "recette" au tableau "recettes" :
    recettes.push({
                      titre: "Titre", 
                      description: "Description",
                      ingredients: [],
                      etapes: [],
                      indicateurs: {
                          difficulte: 3,
                          duree: 3,
                          prix: 3
                      }
                  });
    
    // 2: Afficher la liste des recettes :
    afficher_liste_recettes();
}

/**
 * Affiche la liste des recettes.
 */
function afficher_liste_recettes() {
    // 1: Vider la liste des recettes :
    // L'instruction "innerHTML = ``" permettra de vider tout le html contenu dans le UL
    liste.innerHTML = `` ;

    // 2: Parcourir les recettes du tableau "recettes" :
    // Le numero de l'élément est enregistré dans le i tandis que si on avait mis "of" (à la place de "in") on aurait directement stocké l'élément
    for (let i in recettes) {
        let recette = recettes[i];

        // 3: Vérifier si la recette correspond à la recherche :
        if (
            recherche.value == ''
            || recette.titre.toLowerCase().replace(/[^0-9a-z]/gi, '').indexOf(recherche.value.toLowerCase().replace(/[^0-9a-z]/gi, '')) != -1
        ) {
            // 4: Ajouter le code html correspondant à la recette parcouru à la liste des recettes :
            liste.innerHTML += `<li>
                                    <button class="resume-recette" onclick="afficher_recette(${i}); defiler()">
                                        <h1>${recette.titre}</h1>
                                        <p>${recette.description}</p>
                                        <ul>
                                            <li>Difficulté :
                                                <img src="images/icones/difficulte.svg">
                                                <img ${recette.indicateurs.difficulte < 2 ? 'class="grisee"' : '' } src="images/icones/difficulte.svg">
                                                <img ${recette.indicateurs.difficulte < 3 ? 'class="grisee"' : '' } src="images/icones/difficulte.svg">
                                            </li>
                                            <li>Durée :
                                                <img src="images/icones/duree.svg">
                                                <img ${recette.indicateurs.duree < 2 ? 'class="grisee"' : '' } src="images/icones/duree.svg">
                                                <img ${recette.indicateurs.duree < 3 ? 'class="grisee"' : '' } src="images/icones/duree.svg">
                                            </li>
                                            <li>Prix :
                                                <img src="images/icones/prix.svg">
                                                <img ${recette.indicateurs.prix < 2 ? 'class="grisee"' : '' } src="images/icones/prix.svg">
                                                <img ${recette.indicateurs.prix < 3 ? 'class="grisee"' : '' } src="images/icones/prix.svg">
                                            </li>
                                        </ul>
                                    </button>
                                </li>`
        }
    }
    
    // 4: Activer ou désactiver les boutons en fonction de leur emplacement dans la page :
    verifier_activite_boutons();
}

/**
 * Affiche la recette sélectionnée dans la liste.
 * 
 * @param {number} numero L'emplacement de la recette à afficher dans le tableau "recettes".
 */
function afficher_recette(numero) {
    // 1: Enregistrer dans des nœuds html les éléments à modifier :
    let titre = document.getElementById('titre-recette');
    let ingredients = document.getElementById('ingredients-recette');
    let etapes = document.getElementById('etapes-recette');
    let menu = document.getElementById('menu-recette');

    // 2: Enregistrer dans la variable "recette" la recette du tableau "recettes" à afficher :
    let recette = recettes[numero];

    // 3: Modifier le titre par le titre de la recette à afficher :
    titre.innerHTML = recette.titre;

    // 4: Modifier la liste des ingrédients par la liste des ingrédients de la recette à afficher :
    ingredients.innerHTML = ``;
    for (let i in recette.ingredients) {
        let ingredient = recette.ingredients[i];
        ingredients.innerHTML += `<li>${ingredient}</li>`;
    }

    // 5: Modifier la liste des étapes par la liste des étapes de la recette à afficher : 
    etapes.innerHTML = ``;
    for (let i in recette.etapes) {
        let etape = recette.etapes[i];
        etapes.innerHTML += `<li>${etape}</li>`;
    }

    // 6: Modifier les actions disponible dans le menu :
    menu.innerHTML = `<div id="edition">
                          <button onclick="afficher_options('edition')">Éditer</button>
                          <fieldset disabled>
                              <button onclick="fermer_options()"><img src="images/icones/annuler.svg" alt="X"></button>
                              <button onclick="fermer_options(); "><img src="images/icones/valider.svg" alt="V"></button>
                          </fieldset>
                      </div>  
                      <div id="suppression">
                          <button onclick="afficher_options('suppression')">Supprimer</button>
                          <fieldset disabled>
                              <button onclick="fermer_options()"><img src="images/icones/annuler.svg" alt="X"></button>
                              <button onclick="fermer_options(); "><img src="images/icones/valider.svg" alt="V"></button>
                          </fieldset>
                      </div>`;

    // 7: Activer ou désactiver les boutons en fonction de leur emplacement dans la page :
    verifier_activite_boutons();
}



/**
 * Fait défiler les sections "liste_recettes" et "consultation_recette" alternativement de droite à gauche et de gauche à droite.
 */
function defiler() {
    // 1: Ajouter une durée d'animation aux sections de la page égale à leur largeur :
    liste_recettes.style.animationDuration = liste_recettes.offsetWidth + 'ms';
    consultation_recette.style.animationDuration = consultation_recette.offsetWidth + 'ms';

    // 2: Modifier la propriété CSS "top" des éléments afin de fluidifier l'animation :
    // Enregristre dans la variable decalage le niveau de defilement de le page (nmbr px defini)( la barre reviens a 0 après le defilement)
    let decalage = html.scrollTop;
    html.scrollTop = 0; 
    if (liste_recettes.classList.contains('visible')) {
        liste_recettes.style.top = 0 - decalage + 'px';
        consultation_recette.style.top = 0;
    } else if (consultation_recette.classList.contains('visible')) {
        consultation_recette.style.top = 0 - decalage + 'px';
        liste_recettes.style.top = 0;
    }

    // 3: Échanger de section visible pour créer l'animation :
    consultation_recette.classList.toggle('visible');
    liste_recettes.classList.toggle('visible');

    // 4: Activer ou désactiver les boutons en fonction de leur emplacement dans la page :
    verifier_activite_boutons();
}



/**
 * Affiche les options correspondant à un bouton.
 * 
 * @param {string} bouton Le nom du bouton dont il faut afficher les options.
 */
function afficher_options(bouton) {
    // 1: Fermer toutes les options de boutons :
    fermer_options(bouton);

    // 2: Ouvrir les options du bouton choisi :
    document.querySelector(`#${bouton} fieldset`).toggleAttribute('disabled')
    document.getElementById(bouton).classList.toggle('options-visibles');
}

/**
 * Ferme les options de tous les boutons, hormis celles du bouton indiqué en argument.
 * @param {string} exception Le nom du bouton dont on ne doit pas fermer les options (facultatif).
 */
function fermer_options(exception) {
    // 1: Regrouper dans la liste "fieldsets" tous les fieldsets descendant d'un bouton dont les options sont visibles et dont l'id n'est pas "exception" :
    let fieldsets = document.querySelectorAll(`:not(#${exception}).options-visibles fieldset`);

    // 2: Parcourir les éléments de la liste "fieldsets" dans la variable "fieldset" :
    for (let fieldset of fieldsets) {
        // 3: Retirer l'attribut "disabled" du fieldset parcouru :
        fieldset.toggleAttribute('disabled')
    }

    // 4: Regrouper dans la liste "boutons" tous les boutons dont les options sont visibles et dont l'id n'est pas "exception" :
    let boutons = document.querySelectorAll(`:not(#${exception}).options-visibles`);

    // 5: Parcourir les éléments de la liste "boutons" dans la variable "bouton" :
    for (let bouton of boutons) {
        // 6: Retirer la classe "options-visibles" du bouton parcouru :
        bouton.classList.toggle('options-visibles');
    }
}

/**
 * Active ou désactive les boutons en fonction de s'il sont visible sur la page ou pas.
 */
function verifier_activite_boutons() {
    // 1: Activer ou désactiver les boutons de la section "liste-recettes" pour empêcher le focus sur les éléments non visibles :
    boutons_liste = document.querySelectorAll('#liste-recettes button');
    for (let bouton of boutons_liste) {
        if (liste_recettes.classList.contains('visible')) {
            bouton.toggleAttribute('disabled', false);
        } else {
            bouton.toggleAttribute('disabled', true);
        }
    }

    // 2: Activer ou désactiver les boutons de la section "consultation-recette" pour empêcher le focus sur les éléments non visibles :
    boutons_recettes = document.querySelectorAll('#consultation-recette button');
    for (let bouton of boutons_recettes) {
        if (consultation_recette.classList.contains('visible')) {
            bouton.toggleAttribute('disabled', false);
        } else {
            bouton.toggleAttribute('disabled', true);
        }
    }
}



/**
 * Sauvegarde le tableau "recettes" encodé en JSON dans le "localStorage".
 */
function sauvegarder_recettes() {
    localStorage.setItem('recettes', JSON.stringify(recettes));
}



// Lancer les fonctions nécessaires au fonctionnement du site :
afficher_liste_recettes();
verifier_activite_boutons();