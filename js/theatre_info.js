$(document).ready(function(){
	$('#home-btn').click(function(){
		location.href = 'file:///C:/Users/Kim/Documents/KAIST/2018%20Spring/CS360%20DB/termproject2/html/index.html'
	})

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


	var id = location.href.substring(location.href.indexOf('?id=') + 4)
	$.get(addr + 'theatre?theatreID=' + id, function(data){
		data = JSON.parse(data)
		console.log(data)
		$('.title').html(data.Name)
		$('#location').html(data.Loc)
		for(var i = 0; i < data.movies.length; i++){
			var movie = data.movies[i]
			$('#movies-list').append(
				` <div id='movie-${movie.MovieID}' class="card horizontal movie-card" style='height: 350px'>
				    <div class="card-image">
				      <img class="movie-poster" src="${addr}movie-${movie.MovieID}.jpg" style='height: 346px'>
				    </div>
				    <div class="card-stacked">
				      <div class="card-content" style="padding: 0; margin: 0; height: 350px;">
				        <div class="movie-info" style="height: 70%">
				          <h4 class="movie-title"> <b>${movie.Title}</b> </h4>
				          <p>${movie.Description.substring(0, 580)}${movie.Description.length > 580 ? '...' : ''}</p>
				        </div>
				        <div class="row" style="padding: 5px 15px; height: 15%; margin: 0; border-bottom: solid 3px #ff9800;">
				          <div class="rating-info col s6 m6">
				            <img src="../img/712px-Rottentomatoesnewlogo.svg.png"/>
				            <img src="../img/Certified_Fresh_2018.svg"/>
				            <div style="color: #f92e02"> <b>${Math.round(movie.RTRating)}%</b> </div>
				          </div>
				          <div class="rating-info col s6 m6">
				            <img height="35px" src="../img/IMDB_Logo_2016.svg.png"/>
				            <img src="../img/star.svg"/>
				            <div style="color: #f5c518"> <b>${Math.round(movie.MCRating)}</b> </div>
				          </div>
				        </div>
				        <div class="row" style="padding: 5px 15px; height: 15%;">
				          <div class="rating-info col s6 m6">
				            <div> <b>${movie.StartDate}-${movie.EndDate} </b></div>
				          </div>
				          <div class="rating-info col s6 m6">
				            <div> <b>Number of Viewers:</b> ${movie.NoofViewers} </div>
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
			window.location = `file:///C:/Users/Kim/Documents/KAIST/2018%20Spring/CS360%20DB/termproject2/html/movie_info.html?id=` + $(this).attr('id').split('-')[1]
		})
	})

})
