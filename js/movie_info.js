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
	$.get(addr + 'movie?movieID=' + id, function(data){
		var data = JSON.parse(data)
		console.log(data)

		$.get(addr + 'director?directorID=' + data.DirectorID, function(director){
			var director = JSON.parse(director)
			$('#director-info').html(
				`<div class="col s3 m3" style="text-align: center">
					<img style='height: 100px; margin-top: 10px' src='${addr}director-${director.DirectorID}.jpg'>
				</div>
				<div class="col s5 m5" style="height: 120px; font-size: 40px; color: #ff9800">
					${director.FName} <br>
					${director.LName}
				</div>
				<div class="col s4 m4">
					<div class="list-rating">
		                <img src="../img/Certified_Fresh_2018.svg">
		                <div style="color: #f92e02"> <b>${Math.round(director.averageRating.RT_Average)}%</b> </div>
		            </div>
		            <div class="list-rating">
		                <img src="../img/star.svg">
		                <div style="color: #f5c518"> <b>${Math.round(director.averageRating.MT_Average)}</b> </div>
		            </div>
				</div>`
			)

			$('#director-info').click(function(){
				location.href = 'file:///C:/Users/Kim/Documents/KAIST/2018%20Spring/CS360%20DB/termproject2/html/person_info.html?directorID=' + director.DirectorID
			})

			$('.list-entry').mouseover(function(){
				$(this).find('.s5').css('text-decoration', 'underline')
			}).mouseout(function(){
				$(this).find('.s5').css('text-decoration', 'none')
			})
		})

		for(var i = 0; i < data.actors.length; i++){
			$.get(addr + 'actor?actorID=' + data.actors[i].ActorID, function(actor){
				var actor = JSON.parse(actor)
				$('#actors-list').append(
					`<div id='actor-${actor.ActorID}' class="row list-entry">
						<div class="col s3 m3" style="text-align: center">
							<img style='height: 100px; margin-top: 10px' src='${addr}actor-${actor.ActorID}.jpg'>
						</div>
						<div class="col s5 m5" style="height: 120px; font-size: 40px; color: #ff9800">
							${actor.FName} <br>
							${actor.LName}
						</div>
						<div class="col s4 m4">
							<div class="list-rating">
				                <img src="../img/Certified_Fresh_2018.svg">
				                <div style="color: #f92e02"> <b>${Math.round(actor.averageRating.RT_Average)}%</b> </div>
			                </div>
			                <div class="list-rating">
				                <img src="../img/star.svg">
				                <div style="color: #f5c518"> <b>${Math.round(actor.averageRating.MT_Average)}</b> </div>
			                </div>
						</div>
					</div>`
				)

				$('#actor-' + actor.ActorID).click(function(){
					location.href = 'file:///C:/Users/Kim/Documents/KAIST/2018%20Spring/CS360%20DB/termproject2/html/person_info.html?actorID=' + actor.ActorID
				})

				$('.list-entry').mouseover(function(){
					$(this).find('.s5').css('text-decoration', 'underline')
				}).mouseout(function(){
					$(this).find('.s5').css('text-decoration', 'none')
				})
			})
		}

		
		$('.title').html(data.Title)
		$('#poster').attr('src', addr + 'movie-' + data.MovieID + '.jpg')
		$('.description-box p').html(data.Description)
		$('#genre-title').html(data.Genre.charAt(0).toUpperCase() + data.Genre.substring(1))
		$('#release-date').html(data.ReleaseDate)
		$('#rt-rating').html(Math.round(data.RTRating) + '%')
		$('#mc-rating').html(Math.round(data.MCRating))
		$('#ms-score').html(Math.round((data.RTRating + data.MCRating)/2))
		$('#studio-title').html(data.Studio)
	})
})