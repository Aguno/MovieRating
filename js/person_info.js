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

	var type = 'actor'
	var id = ''
	if(location.href.indexOf('?actorID=') != -1)
		id = location.href.substring(location.href.indexOf('?actorID=') + 9)
	else{
		type = 'director'
		id = location.href.substring(location.href.indexOf('?directorID=') + 12)
	}

	$.get(addr + type + '?' + type + 'ID=' + id, function(data){
		console.log(data)
		data = JSON.parse(data)
		$('.title').html(data.FName + ' ' + data.LName)
		$('#picture').attr('src', addr + type + '-' + data[type === 'actor' ? 'ActorID' : 'DirectorID'] + '.jpg')
		$('#sex-label').html(data.Sex)
		$('#dob-label').html(data.DOfBirth)
		$('#nat-label').html(data.Natl)
		$('#rt-rating').html('<b>' + Math.round(data.averageRating.RT_Average) + '%</b>')
		$('#mc-rating').html('<b>' + Math.round(data.averageRating.MT_Average) + '</b>')
		$('#ms-score').html(Math.round((data.averageRating.RT_Average + data.averageRating.MT_Average)/2))

		for(var i = 0; i < data.movies.length; i++){
			var movie = data.movies[i]
			$('#movies-list').append(
				`<div id='movie-${movie.MovieID}' class="row list-entry">
					<div class="col s2 m2" style="text-align: center">
						<img style='height: 130px; margin-top: 10px' src='${addr}movie-${movie.MovieID}.jpg'>
					</div>
					<div class="col s7 m7" style="height: 150px; font-size: 40px; color: #ff9800">
						${type === 'actor' ? `<div style='color: black; font-size: 15px; height: 15px; margin-top: 5px'>Role: ${movie.Role}</div>` : ''}
						${movie.Title}
					</div>
					<div class="col s3 m3" style="margin-top: 20px">
						<div class="list-rating">
				            <img src="../img/Certified_Fresh_2018.svg">
				            <div style="color: #f92e02"> <b>${Math.round(movie.RTRating)}%</b> </div>
				        </div>
				        <div class="list-rating">
				            <img src="../img/star.svg">
				            <div style="color: #f5c518"> <b>${Math.round(movie.MCRating)}</b> </div>
				        </div>
					</div>
				</div>`
			)
		}

		$('.list-entry').click(function(){
			location.href = 'file:///C:/Users/Kim/Documents/KAIST/2018%20Spring/CS360%20DB/termproject2/html/movie_info.html?id=' + $(this).attr('id').split('-')[1]
		})

		$('.list-entry').mouseover(function(){
			$(this).find('.s7').css('text-decoration', 'underline')
		}).mouseout(function(){
			$(this).find('.s7').css('text-decoration', 'none')
		})
	})
})