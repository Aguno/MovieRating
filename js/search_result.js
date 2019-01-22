var typeChosen = ''

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

	var info = location.href.substring(location.href.indexOf('?') + 1)
	if(info.indexOf('&') != -1){
		var type = info.split('&')[0].split('=')[1]
		var str = info.split('&')[1].split('=')[1]
	}else{
		var type = info.split('=')[1]
		var str = ''
	}

	$('#search-title').html(type.charAt(0).toUpperCase() + type.substring(1) + ' Search Results')

	if(str){
		$.get(addr + 'search?type=' + type + '&name=' + str, function(data){
			fillList(type, data)
		})
	}else{
		$.get(addr + 'search?type=' + type, function(data){
			fillList(type, data)
		})
	}


	$('.dropdown-trigger').dropdown();

	$('.search-btn').mouseover(function(){
		$('.search-btn').css('background-color', '#e8e8e8')
	}).mouseout(function(){
		$('.search-btn').css('background-color', '#fff')
	})

	$('.search-btn').click(function(){
		if(typeChosen === ''){
			$('.popup').fadeIn(function(){ $(this).delay(1000).fadeOut() })
		}else{
			location.href = 'file:///C:/Users/Kim/Documents/KAIST/2018%20Spring/CS360%20DB/termproject2/html/search_result.html?type=' + typeChosen + '&name=' + encodeURIComponent($('#search').val())
		}
	})

	$('#search').keyup(function(e){
		if(e.keyCode == 13){
			if(typeChosen === ''){
				$('.popup').fadeIn(function(){ $(this).delay(1000).fadeOut() })
			}else{
				location.href = 'file:///C:/Users/Kim/Documents/KAIST/2018%20Spring/CS360%20DB/termproject2/html/search_result.html?type=' + typeChosen + '&name=' + encodeURIComponent($('#search').val())
			}
		}
	})

	$('#search-movie-sel').click(function(){
		$('.dropdown-trigger').css('color', '#000000de')
		$('.dropdown-trigger').html(`Movies <i class="material-icons">arrow_drop_down</i>`)
		typeChosen = 'movie'
	})

	$('#search-director-sel').click(function(){
		$('.dropdown-trigger').css('color', '#000000de')
		$('.dropdown-trigger').html(`Directors <i class="material-icons">arrow_drop_down</i>`)
		typeChosen = 'director'
	})

	$('#search-actor-sel').click(function(){
		$('.dropdown-trigger').css('color', '#000000de')
		$('.dropdown-trigger').html(`Actors <i class="material-icons">arrow_drop_down</i>`)
		typeChosen = 'actor'
	})

	$('#search-theatre-sel').click(function(){
		$('.dropdown-trigger').css('color', '#000000de')
		$('.dropdown-trigger').html(`Theatres <i class="material-icons">arrow_drop_down</i>`)
		typeChosen = 'theatre'
	})
})

function fillList(type, data){
	data = JSON.parse(data)
	if(data.length == 0){
		$('#search-list').append('<h5> No Results</h5>')
		return
	}
	for(var i = 0; i < data.length; i++){
		var entry = data[i]
		$.get(addr + type + '?' + type + 'ID=' + entry[type.charAt(0).toUpperCase() + type.substring(1) + 'ID'], function(info){
			info = JSON.parse(info)
			if(type === 'actor'){
				$('#search-list').append(
					`<div id='actor-${info.ActorID}' class="card horizontal search-entry">
			            <div class="col s3 m3" style="text-align: center; border-right: solid 2px #ff9800">
			              <img style='height: 110px; margin-top: 5px' src='${addr}actor-${info.ActorID}.jpg'>
			            </div>
			            <div class="col s7 m7" style="height: 120px; font-size: 40px; border-right: solid 2px #ff9800; color: #ff9800">
			              <span class="entry-title">${info.FName} ${info.LName}</span>
			            </div>
			            <div class="col s2 m2" style="padding-top: 20px">
			              <div class="search-rating">
			                <img src="../img/Certified_Fresh_2018.svg">
			                <div style="color: #f92e02"> <b>${Math.round(info.averageRating.RT_Average)}%</b> </div>
			              </div>
			              <div class="search-rating">
			                <img src="../img/star.svg">
			                <div style="color: #f5c518"> <b>${Math.round(info.averageRating.MT_Average)}</b> </div>
			              </div>
			            </div>
			          </div>`)

				$('.card').click(function(){
					location.href = 'file:///C:/Users/Kim/Documents/KAIST/2018%20Spring/CS360%20DB/termproject2/html/person_info.html?actorID=' + $(this).attr('id').split('-')[1]
				})

				$('.card').mouseover(function(){
					$(this).css('border', 'solid 2px #ff9800')
					$(this).find('.entry-title').css('text-decoration', 'underline')
				}).mouseout(function(){
					$(this).css('border', 'solid 2px white')
					$(this).find('.entry-title').css('text-decoration', 'none')
				})
			}else if(type === 'director'){
				$('#search-list').append(
					`<div id='director-${info.DirectorID}' class="card horizontal search-entry">
			            <div class="col s3 m3" style="text-align: center; border-right: solid 2px #ff9800">
			              <img style='height: 110px; margin-top: 5px' src='${addr}director-${info.DirectorID}.jpg'>
			            </div>
			            <div class="col s7 m7" style="height: 120px; font-size: 40px; border-right: solid 2px #ff9800; color: #ff9800">
			              <span class="entry-title">${info.FName} ${info.LName}</span>
			            </div>
			            <div class="col s2 m2" style="padding-top: 15px">
			              <div class="search-rating">
			                <img src="../img/Certified_Fresh_2018.svg">
			                <div style="color: #f92e02"> <b>${Math.round(info.averageRating.RT_Average)}%</b> </div>
			              </div>
			              <div class="search-rating">
			                <img src="../img/star.svg">
			                <div style="color: #f5c518"> <b>${Math.round(info.averageRating.MT_Average)}</b> </div>
			              </div>
			            </div>
			          </div>`)

				$('.card').click(function(){
					location.href = 'file:///C:/Users/Kim/Documents/KAIST/2018%20Spring/CS360%20DB/termproject2/html/person_info.html?directorID=' + $(this).attr('id').split('-')[1]
				})

				$('.card').mouseover(function(){
					$(this).css('border', 'solid 2px #ff9800')
					$(this).find('.entry-title').css('text-decoration', 'underline')
				}).mouseout(function(){
					$(this).css('border', 'solid 2px white')
					$(this).find('.entry-title').css('text-decoration', 'none')
				})
			}else if(type === 'movie'){
				$('#search-list').append(
					`<div id='director-${info.MovieID}' class="card horizontal search-entry">
			            <div class="col s3 m3" style="text-align: center; border-right: solid 2px #ff9800">
			              <img style='height: 110px; margin-top: 5px' src='${addr}movie-${info.MovieID}.jpg'>
			            </div>
			            <div class="col s7 m7" style="height: 120px; font-size: 40px; border-right: solid 2px #ff9800; color: #ff9800">
			              <span class="entry-title">${info.Title}</span>
			            </div>
			            <div class="col s2 m2" style="padding-top: 15px">
			              <div class="search-rating">
			                <img src="../img/Certified_Fresh_2018.svg">
			                <div style="color: #f92e02"> <b>${Math.round(info.RTRating)}%</b> </div>
			              </div>
			              <div class="search-rating">
			                <img src="../img/star.svg">
			                <div style="color: #f5c518"> <b>${Math.round(info.MCRating)}</b> </div>
			              </div>
			            </div>
			          </div>`)

				$('.card').click(function(){
					location.href = 'file:///C:/Users/Kim/Documents/KAIST/2018%20Spring/CS360%20DB/termproject2/html/movie_info.html?id=' + $(this).attr('id').split('-')[1]
				})

				$('.card').mouseover(function(){
					$(this).css('border', 'solid 2px #ff9800')
					$(this).find('.entry-title').css('text-decoration', 'underline')
				}).mouseout(function(){
					$(this).css('border', 'solid 2px white')
					$(this).find('.entry-title').css('text-decoration', 'none')
				})
			}else if(type === 'theatre'){
				$('#search-list').append(
					`<div id='director-${info.TheatreID}' class="card horizontal search-entry" style="line-height: 1.2">
			            <div class="col s7 m7" style="height: 120px; font-size: 40px; border-right: solid 2px #ff9800; color: #ff9800">
			              <span style="font-size: 25px; color: #9e9e9e">Name </span></br>
			              <span class="entry-title">${info.Name}</span>
			            </div>
			            <div class="col s5 m5" style="height: 120px; font-size: 40px;">
			              <span style="font-size: 25px; color: #9e9e9e">Location</span> </br>
			              <span class="entry-title">${info.Loc}</span>
			            </div>
			          </div>`)

				$('.card').click(function(){
					location.href = 'file:///C:/Users/Kim/Documents/KAIST/2018%20Spring/CS360%20DB/termproject2/html/theatre_info.html?id=' + $(this).attr('id').split('-')[1]
				})

				$('.card').mouseover(function(){
					$(this).css('border', 'solid 2px #ff9800')
					$(this).find('.entry-title').css('text-decoration', 'underline')
				}).mouseout(function(){
					$(this).css('border', 'solid 2px white')
					$(this).find('.entry-title').css('text-decoration', 'none')
				})
			}
		})
	}
}