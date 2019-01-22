var type = '';

$(document).ready(function(){
	
	$('#nav-movie').click(function(){
		location.href = 'file:///C:/Users/Kim/Documents/KAIST/2018%20Spring/CS360%20DB/termproject2/html/search_result.html?type=movie'
	})
	$('#nav-director').click(function(){
		location.href = 'file:///C:/Users/Kim/Documents/KAIST/2018%20Spring/CS360%20DB/termproject2/html/search_result.html?type=director'
	})
	$('#nav-actor').click(function(){
		location.href = 'file:///C:/Users/Kim/Documents/KAIST/2018%20Spring/CS360%20DB/termproject2/html/search_result.html?type=actor'
	})
	$('#nav-theatre').click(function(){
		location.href = 'file:///C:/Users/Kim/Documents/KAIST/2018%20Spring/CS360%20DB/termproject2/html/search_result.html?type=theatre'
	})

	$.get(addr + "recentmovies", function(data){
		data = JSON.parse(data)
		for(var i = 0; i < data.length; i++){
			var movie = data[i]
			$('#recent-movies').append(
				`<div id='card-${movie.MovieID}' class="card horizontal movie-card">
		            <div class="card-image">
		              <img class="movie-poster" src="${addr}movie-${movie.MovieID}.jpg">
		            </div>
		            <div class="card-stacked">
		              <div class="card-content" style="padding: 0; margin: 0; height: 300px;">
		                <div class="movie-info">
		                  <h4 class="movie-title"> <b>${movie.Title}</b> </h4>
		                  <p>${movie.Description.substring(0, 580)}${movie.Description.length > 580 ? '...' : ''}</p>
		                </div>
		                <div class="row" style="padding: 10px 15px; height: 20%;">
		                  <div class="rating-info col s6 m6">
		                    <img src="../img/712px-Rottentomatoesnewlogo.svg.png"/>
		                    <img src="../img/Certified_Fresh_2018.svg"/>
		                    <div style="color: #f92e02"> <b>${movie.RTRating}%</b> </div>
		                  </div>
		                  <div class="rating-info col s6 m6">
		                    <img height="35px" src="../img/IMDB_Logo_2016.svg.png"/>
		                    <img src="../img/star.svg"/>
		                    <div style="color: #f5c518"> <b>${movie.MCRating}</b> </div>
		                  </div>
		                </div>
		              </div>
		            </div>
		          </div>`
			)
		}	

		$('.movie-card').mouseover(function(){
			$(this).css('border', 'solid 2px #ff9800')
			$(this).find('.movie-title').css('text-decoration', 'underline')
		}).mouseout(function(){
			$(this).css('border', 'solid 2px white')
			$(this).find('.movie-title').css('text-decoration', 'none')
		})

		$('.movie-card').click(function(){
			location.href = 'file:///C:/Users/Kim/Documents/KAIST/2018%20Spring/CS360%20DB/termproject2/html/movie_info.html?id=' + $(this).attr('id').split('-')[1]
		})
	})

	$.get(addr + "topmovies", function(data){
		data = JSON.parse(data)
		for(var i = 0; i < data.length; i++){
			var movie = data[i]
			$('#top-movies').append(
				` <div id='entry-${movie.MovieID}' class="card horizontal movie-entry" style="cursor: pointer;">
		            <div class="card-stacked">
		              <div class="card-content row" style="padding: 0; margin: 0;">
		                <div class="col s1 m1" style="height: 70px; vertical-align: middle; padding: 15px 0 0 10px">
		                  <b style="color: #808080">${i + 1}</b>
		                </div>
		                <div class="col s8 m8" style="vertical-align: middle; padding: 10px; height: 100%">
		                  <h4 class="list-title"> ${movie.Title} </h4>
		                </div>
		                <div class="col s3 m3" style="border-left: solid 1px #ff9800; padding: 10px 0 10px 5px;">
		                  <div class='list-rating'>
		                    <img src="../img/Certified_Fresh_2018.svg"/>
		                    <div style="color: #f92e02"> <b>${movie.RTRating}%</b> </div>
		                  </div>
		                  <div class='list-rating'>
		                    <img src="../img/star.svg"/>
		                    <div style="color: #f5c518"> <b>${movie.MCRating}</b> </div>
		                  </div>
		                </div>
		              </div>
		            </div>
		          </div>`
			)
		}

		$('.movie-entry').mouseover(function(){
			$(this).css('border', 'solid 2px #ff9800')
			$(this).find('.list-title').css('text-decoration', 'underline')
		}).mouseout(function(){
			$(this).css('border', 'solid 2px white')
			$(this).find('.list-title').css('text-decoration', 'none')
		})

		$('.movie-entry').click(function(){
			location.href = 'file:///C:/Users/Kim/Documents/KAIST/2018%20Spring/CS360%20DB/termproject2/html/movie_info.html?id=' + $(this).attr('id').split('-')[1]
		})
	})

	$('.dropdown-trigger').dropdown();

	$('.search-btn').mouseover(function(){
		$('.search-btn').css('background-color', '#e8e8e8')
	}).mouseout(function(){
		$('.search-btn').css('background-color', '#fff')
	})

	$('.search-btn').click(function(){
		if(type === ''){
			$('.popup').fadeIn(function(){ $(this).delay(1000).fadeOut() })
		}else{
			location.href = 'file:///C:/Users/Kim/Documents/KAIST/2018%20Spring/CS360%20DB/termproject2/html/search_result.html?type=' + type + '&name=' + encodeURIComponent($('#search').val())
		}
	})

	$('#search').keyup(function(e){
		if(e.keyCode == 13){
			if(type === ''){
				$('.popup').fadeIn(function(){ $(this).delay(1000).fadeOut() })
			}else{
				location.href = 'file:///C:/Users/Kim/Documents/KAIST/2018%20Spring/CS360%20DB/termproject2/html/search_result.html?type=' + type + '&name=' + encodeURIComponent($('#search').val())
			}
		}
	})

	$('#search-movie-sel').click(function(){
		$('.dropdown-trigger').css('color', '#000000de')
		$('.dropdown-trigger').html(`Movies <i class="material-icons">arrow_drop_down</i>`)
		type = 'movie'
	})

	$('#search-director-sel').click(function(){
		$('.dropdown-trigger').css('color', '#000000de')
		$('.dropdown-trigger').html(`Directors <i class="material-icons">arrow_drop_down</i>`)
		type = 'director'
	})

	$('#search-actor-sel').click(function(){
		$('.dropdown-trigger').css('color', '#000000de')
		$('.dropdown-trigger').html(`Actors <i class="material-icons">arrow_drop_down</i>`)
		type = 'actor'
	})

	$('#search-theatre-sel').click(function(){
		$('.dropdown-trigger').css('color', '#000000de')
		$('.dropdown-trigger').html(`Theatres <i class="material-icons">arrow_drop_down</i>`)
		type = 'theatre'
	})

	$('.movie-card').click(function(){
		window.location = `file:///C:/Users/Kim/Documents/KAIST/2018%20Spring/CS360%20DB/termproject2/html/movie_info.html`
	})
})

