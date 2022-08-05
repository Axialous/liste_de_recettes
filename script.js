localStorage.setItem('recettes' , JSON.stringify([
{
    titre: "Titre", 
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo est reiciendis alias magnam culpa doloremque nostrum amet consequuntur sed accusamus.",
    ingredients: ["Ingretient 1", "Ingretient 2", "Ingretient 3", "Ingredient 4"],
    etapes: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, ipsam!", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, ipsam!", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, ipsam!"],
    indicateurs: {
        difficulte: 2,
        duree: 3,
        prix: 1
    }
}
]

))

var recettes = JSON.parse(localStorage.getItem('recettes')) || [];

var html = document.querySelector('html');
var liste_recettes = document.getElementById('liste-recettes');
var consultation_recette = document.getElementById('consultation-recette');
var suppression = document.getElementById('suppression');
var liste = document.querySelector('#liste-recettes ul');


function ajouter_recette(){
    recettes.push(
        {
            titre: "Titre", 
            description: "description.",
            ingredients: [],
            etapes: [],
            indicateurs: {
                difficulte: 3,
                duree: 3,
                prix: 3
            }
        }
    )

    afficher_liste_recette();
}


// innerHTML permettra de vider tout le html contenu dans le UL
function afficher_liste_recette(){
    liste.innerHTML = `` ;
// le numero de l'element est enregistrer dans le i tandis que si on aurais mis of ( a la place de in on aurais directement stocker l'element
    for (let i in recettes){
        let recette = recettes[i];
        liste.innerHTML += `<li>
                            <button class="resume-recette" onclick=" afficher_recette(${i}); defiler() ">
                             <h1>${recette.titre}</h1>
                             <p>${recette.description}</p>
                             <ul>
                                    <li>Difficulté :
                                        <img src="images/icones/difficulte.svg"> 
                                        <img ${recette.indicateurs.difficulte < 2 ? 'class="grisee" ' : '' } src="images/icones/difficulte.svg"> 
                                        <img ${recette.indicateurs.difficulte < 3 ? 'class="grisee" ' : ''} src="images/icones/difficulte.svg">
                                    </li>

                                    <li>Durée :
                                        <img src="images/icones/duree.svg">
                                        <img ${recette.indicateurs.duree < 2 ? 'class="grisee" ' : '' } src="images/icones/duree.svg">
                                        <img ${recette.indicateurs.duree < 3 ? 'class="grisee" ' : '' } src="images/icones/duree.svg">
                                    </li>

                                    <li>Prix :
                                        <img src="images/icones/prix.svg">
                                        <img ${recette.indicateurs.prix < 2 ? 'class="grisee" ' : '' }src="images/icones/prix.svg">
                                        <img ${recette.indicateurs.prix < 3 ? 'class="grisee" ' : '' } src="images/icones/prix.svg">
                                    </li>
                             </ul>
                         </button>
                     </li>`
    } 
   
}

function afficher_recette(numero){

    let titre = document.getElementById('titre-recette');
    let ingredients = document.getElementById('ingredients-recette');
    let etapes = document.getElementById('etapes-recette');

    let recette = recettes[numero];

    titre.innerHTML = recette.titre;

//boucle for sert a parcourir tout les ingredients de la recette
    ingredients.innerHTML = `` ;
    for (let i in recette.ingredients){
        let ingredient = recette.ingredients[i];
        ingredients.innerHTML += ` <li>${ingredient}</li> `;
    }

//boucle for sert a parcourir tout les etape de la recette
    etapes.innerHTML = `` ;
    for (let i in recette.etapes){
        let etape = recette.etapes[i];
        etapes.innerHTML += ` <li>${etape}</li> `;
    }

}


/**
 * Fait défiler les sections "liste_recettes" et "consultation_recette" alternativement de droite à gauche et de gauche à droite.
 */
function defiler() {
    liste_recettes.style.animationDuration = '1500ms';
    consultation_recette.style.animationDuration = '1500ms'

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

    consultation_recette.classList.toggle('visible');
    liste_recettes.classList.toggle('visible');
}

function demander_confirmation_suppression() {
    suppression.classList.toggle('options-visibles')
}

afficher_liste_recette();
