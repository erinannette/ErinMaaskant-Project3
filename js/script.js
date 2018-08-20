const coffeeTypes = {
	a: {
		name: 'Instant Cuppa',
		description: `Coffee sprayed into the air and instantly dried by simultaneously blowing hot air, creating tiny water-soluble coffee crystals. You’re a straight-up cuppa joe but with an interesting history. You might look ordinary and simple on the outside, but you’ve got some back story and you’re living life on your own terms.`,
		timesChosen: 0,
		image: '../assets/02-instant.svg'
	},
	b: {
		name: 'Brewed',
		description: `Coffeemaker, French Press or a Chemex: pour hot water onto ground coffee beans. You're beloved by everyone because of your straight-forward, approachable, no-nonsense approach. Your versatility means you can go anywhere, be in any situation, and always be fantastic.`,
		timesChosen: 0,
		image: '../assets/03-brew.svg'
	},
	c: {
		name: 'Cappuccino',
		description: `Equal parts espresso, steamed milk, and foam. Your smooth, easy-drinking nature hides the underlying complexity of your makeup: that milk makes you cozy and inviting, but that fancy foam art on top isn’t straightforward. That takes skill, patience, and a flare for the arts.`,
		timesChosen: 0,
		image: '../assets/04-cappuccino.svg'
	},
	d: {
		name: 'Ristretto',
		description: `Very concentrated espresso shot - 22ml instead of the usual 30ml. You do not mess around - life is meant for living and that is exactly what you’re doing. Why do things in halves? GO - DO - PERIOD.`,
		timesChosen: 0,
		image: '../assets/05-ristretto.svg'
	},
	e: {
		name: 'Unicorn Frappuccino',
		description: `Who are you, coffee imposter? You’re not coffee I don’t even know you.`,
		timesChosen: 0,
		image: '../assets/06-frappuccino.svg'
	},
}

// CLICK FROM HEADER TO QUIZ, THEN FROM QUESTION TO QUESTION - STAYING ON THE SAME PAGE
$(function () {
	$('#cup').click(function() {
		$('.header').addClass('hide');
		$('.q1').fadeIn('.hide');
	});
	$('.radio-1').click(function () {
		$('.q1').fadeOut('hide');
		$('.q2').removeClass('hide');
	});
	$('.radio-2').click(function () {
		$('.q2').fadeOut('hide');
		$('.q3').removeClass('hide');
	});
	$('.radio-3').click(function () {
		$('.q3').fadeOut('hide');
		$('.q4').removeClass('hide');
	});
	$('.radio-4').click(function () {
		$('.q4').fadeOut('hide');
		$('.q5').removeClass('hide');
	});
	$('.radio-5').click(function () {
		$('.q5').fadeOut('hide');
		$('.results').removeClass('hide');
	});

// GETTING THE ANSWER TO DISPLAY ONCE SUBMIT BUTTON IS CLICKED
	// When the form submits:
	// grab the form - prevent it from doing its usual thing by using event.preventDefault
	// so that we can apply our JS
	$('form').on('submit', function (event) {
		event.preventDefault();
		// write a jquery element to grab all checked elements
		const questionOne = $('input:radio[name=radio-1]:checked').val();
		const questionTwo = $('input:radio[name=radio-2]:checked').val();
		const questionThree = $('input:radio[name=radio-3]:checked').val();
		const questionFour = $('input:radio[name=radio-4]:checked').val();
		const questionFive = $('input:radio[name=radio-5]:checked').val();

		const answerArray = []
		answerArray.push(questionOne, questionTwo, questionThree, questionFour, questionFive);

		// Loop the resulting array - 
		// Grab the number of times each letter has been chosen
		// Add 1 to the "timesChosen" property for every time it's been chosen 
		for (let i = 0; i < answerArray.length; i++) {
			// console.log(answerArray[i]);    
			if (answerArray[i] === 'a') {
				coffeeTypes.a.timesChosen++;
			}
			else if (answerArray[i] === 'b') {
				coffeeTypes.b.timesChosen++;
			}
			else if (answerArray[i] === 'c') {
				coffeeTypes.c.timesChosen++;
			}
			else if (answerArray[i] === 'd') {
				coffeeTypes.d.timesChosen++;
			}
			else {
				coffeeTypes.e.timesChosen++;
			}
		};
		// Identify the answer with the highest "timesChosen" 
		// by comparing them against each other
		let results = [coffeeTypes.a]
		if (coffeeTypes.b.timesChosen > coffeeTypes.a.timesChosen) {
			results = [coffeeTypes.b];
		}
		else if (coffeeTypes.b.timesChosen === coffeeTypes.a.timesChosen) {
			results.push(coffeeTypes.b);
		};
		if (coffeeTypes.c.timesChosen > results[0].timesChosen) {
			results = [coffeeTypes.c];
		}
		else if (coffeeTypes.c.timesChosen === results[0].timesChosen) {
			results.push(coffeeTypes.c);
		};
		if (coffeeTypes.d.timesChosen > results[0].timesChosen) {
			results = [coffeeTypes.d];
		}
		else if (coffeeTypes.d.timesChosen === results[0].timesChosen) {
			results.push(coffeeTypes.d);
		};
		if (coffeeTypes.e.timesChosen > results[0].timesChosen) {
			results = [coffeeTypes.e];
		}
		else if (coffeeTypes.e.timesChosen === results[0].timesChosen) {
			results.push(coffeeTypes.e);
		};

		// If there is a tie, Math.random function chooses a winner
		// and displays it at the bottom of the quiz
		let finalResults = []
		if (results.length > 1) {
			const resultsTieBreak = results[Math.floor(Math.random() * results.length)];
			finalResults.push(resultsTieBreak);
			// display results
			$('.results-container').html(`<h3>${finalResults[0].name}</h3><p>${finalResults[0].description}</p>`);
			// replace the submit-coffee cup icon with the winning result icon
			$('#submit').css('background-image', `url(${finalResults[0].image})`);
			// hide submit-instruction text
			$('.finish').addClass('hide');
		}
		else {
			finalResults.push(results[0]);
			// display results
			$('.results-container').html(`<h3>${finalResults[0].name}</h3><p>${finalResults[0].description}</p>`);
			// replace the submit-coffee cup icon with the winning result icon
			$('#submit').css('background-image', `url(${finalResults[0].image})`);
			// hide submit-instruction text
			$('.finish').addClass('hide');
		};
	});
});