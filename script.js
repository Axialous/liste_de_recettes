/*{
 *    titre: "", 
 *    description: "",
 *    ingredients: ["…", "…", "…"],
 *    etapes: ["…", "…", "…"],
 *    indicateurs: {
 *        difficulte: x,
 *        duree: x,
 *        prix: x
 *    }
 *
 *}
*/

var html = document.querySelector('html');
var liste_recettes = document.getElementById('liste-recettes');
var consultation_recette = document.getElementById('consultation-recette');
var suppression = document.getElementById('suppression');

/**
 * Fait défiler les sections "liste_recettes" et "consultation_recette" alternativement de droite à gauche et de gauche à droite.
 */
function defiler() {
    liste_recettes.style.animationDuration = '1500ms';
    consultation_recette.style.animationDuration = '1500ms'

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