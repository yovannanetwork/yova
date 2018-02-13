
$(document).ready(init);
var sectionActual = null;

var name1;
var name2;
var idActualJuego;

function init(){
	sectionActual = $('#init-section');
	$('#init-play').click(clickGoPlayer);
	$('#start-play').click(clickGoAccion);
	$('#ir-historial').click(goToHistorial);
	
	$('#enviar-comment').click(clickBtnComment)
	
	$('#list-objet').on('click', '.btn', clickBotonItemJuego);
	$('#new-game').on('click', createNewGame);
}
// funcion para ir a la siguiente seccion comentario a travez de la funcion  irNexSection
function clickBotonItemJuego(){
	//console.log($(this).parent().data(_idGame));
	var idGame = $(this).parent().data('id');
	irNextSection('comentarios');
	getComentarios(idGame);
	idActualJuego = idGame;
	$('.historial').hide();
}
//llamando al evento de enviar comentario
function createNewGame(){
	onPostNewGame()
}
//envia informacion de quien gano segun los movimientos al historial
function onPostNewGame(){
	var ganador = localStorage.getItem('ganador');
	var perdedor = localStorage.getItem('perdedor');
	var numberTurn = localStorage.getItem('numberTurn');
	$.ajax({
		url: 'https://test-ta.herokuapp.com/games',
		type: 'POST',
		data: {game: {winner_player:ganador, loser_player:perdedor, number_of_turns_to_win:numberTurn }}
	}).done(function(_data){
		console.log(_data);
		clickCudros(_data);
	});
}
//click para enviar nombre y el texto de cmentario
function clickBtnComment(){
	var name = $('#name-comment');
	var commentText = $('#area-comment');
	postComment(idActualJuego, name.val(), commentText.val());
	name.focus();
	name.val()=  "";
}
//el ajax de enviar comentario
function postComment(_idGame, _name, _content){
	var comentaries = $('#comentaries');
	$.ajax({
		url: 'https://test-ta.herokuapp.com/games/'+_idGame+'/comments',
		type: 'POST',
		data: {comment:{name: _name, content: _content, game_id: _idGame }}
	}).done(function(_data){
		console.log(_data)
		getComentarios(_idGame);
	});
}
// funcion al siguiente seccion
function irNextSection(_idVisible){
	var visible = $('.visible');
	sectionActual.removeClass(visible);
	var nextSection = $('.'+_idVisible);
	nextSection.addClass('visible');
	sectionActual = nextSection;
}

function clickGoPlayer(){
	irNextSection('names');
	$('#name1, #name2').change(localStorageSet);
}
function clickGoAccion(){
	irNextSection('game');
	localStorageGet();
	
}
function goToHistorial(evt){
	evt.preventDefault();
	irNextSection('historial');
	getHistorial();
}
function localStorageSet(evt){
	var jugador1 = $('#name1').val();
	var jugador2 = $('#name2').val();
	localStorage.setItem('primerJugador', jugador1);
	localStorage.setItem('segundoJugador', jugador2);
}
function localStorageGet(){
	name1 = localStorage.getItem('primerJugador');
	name2 = localStorage.getItem('segundoJugador');
	$('.yovanna').text(name1+':').val();
	$('.paola').text(name2+':').val();
}
function getHistorial(){
	$.ajax({
		url: 'https://test-ta.herokuapp.com/games',
		type: 'GET'
	}).done(function(_data){
		//console.log(_data);
		dibujarHistorial(_data);
	})
}
function getSinglePage(){
	$.ajax({
		url: '',
		type: 'GET'
	})
}
function getComentarios(_idGame){
	$.ajax({
		url: 'https://test-ta.herokuapp.com/games/'+_idGame+'/comments',
		type: 'GET'
	}).done(function(_data){
		//console.log(_datos);
		dibujarComentario(_data);
	})
}

function dibujarHistorial(_datos){
	var listaGame = $('#list-objet');
	for(var i in _datos){
		var html = '<li data-id="'+_datos[i].id+'" class="list-group-item">'+_datos[i].winner_player+' gano a '+_datos[i].loser_player+' en '+_datos[i].number_of_turns_to_win+' movimientos '+'<button class="btn">comentar</button>';
		listaGame.append(html);
	}
}
function dibujarComentario(_datos){
	var comentaries = $('#comentaries');
	var listComment = $('#lista-comment');
	for(var i in _datos){
		var html = '<li class="list-group-item">'+_datos[i].name +' dice:<p>'+_datos[i].content+'</p></li>';
		listComment.append(html);
		//comentaries.scrollTop = comentaries.scrollHeight;
	}
}


























