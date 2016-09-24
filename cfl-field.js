function Field( element_id, visitor_team_abbreviation, home_team_abbreviation ) {
	this.element_id = element_id;
	//this.currentPoint = 0;
	//this.currentPlayY = 10;

	// Define information about the teams involved.
	this.visitor_team_abbreviation = visitor_team_abbreviation;
	this.visitor_team_letter = null;
	this.visitor_team_colour = null;
	this.home_team_abbreviation = home_team_abbreviation;
	this.home_team_letter = null;
	this.home_team_colour = null;

	// Define values that set how the field looks.
	this.yardToPixelMultipler = document.getElementById(this.element_id).width / 150;
	this.hashMarkSecondLineMultiplier = 0.36923076923077;
	this.hashMarkThirdLineMultiplier = 0.63076923076923;
	this.yardMarkersFirstLineMultiplier = 0.18461538461538;
	this.yardMarkersSecondLineMultiplier = 0.81538461538462;
	this.endZoneWidth = 20;
	this.yardLineBetweenWidth = 5;
	this.hashMarkHeight = this.yardToPixelMultipler;
	
	this.ctx = document.getElementById(element_id).getContext('2d');
	//this.ctx.scale(2,2);

	this.drawPlay = function( team_abbreviation, play_type_id, field_position_start, field_position_end ) {
		1;
	}

	this.setTeamInfo = function() {
		this.visitor_team_letter = this.getTeamValue(this.visitor_team_abbreviation, 'letter');
		this.visitor_team_colour = this.getTeamValue(this.visitor_team_abbreviation, 'colour');
		this.home_team_letter = this.getTeamValue(this.home_team_abbreviation, 'letter');
		this.home_team_colour = this.getTeamValue(this.home_team_abbreviation, 'colour');
	}
	
	this.drawField = function() {
		// Fill the inside of the field.
		this.ctx.fillStyle = "rgb(0, 153, 41)";
		this.ctx.fillRect(0, 0, document.getElementById(this.element_id).width, document.getElementById(this.element_id).height);

		// Fill the end zones.
		this.fillEndZones();

		// Draw yard markers every 5 yards.
		this.createLines();

		// Draw hash marks on the field.
		this.createHashMarks();

		// Draw ten-yard numbers on the field.
		this.createYardNumbers();
	}
	
	this.createLines = function() {
		this.ctx.strokeStyle = "rgb(255, 255, 255)";
		this.ctx.lineWidth = 1;

		var int_width_of_endzone = this.endZoneWidth * this.yardToPixelMultipler;
		
		// Draw our regular lines.
		for ( var i = 0; i < 23; i++ ) {
			this.drawLine(int_width_of_endzone + (i * this.yardLineBetweenWidth * this.yardToPixelMultipler));
		}

		// Draw the thicker endzone lines.
		this.ctx.lineWidth = 2;
		this.drawLine(int_width_of_endzone - 1);
		this.drawLine(document.getElementById(this.element_id).width - int_width_of_endzone);
	}

	this.createHashMarks = function() {
		this.ctx.strokeStyle = "rgb(255, 255, 255)";
		this.ctx.lineWidth = 1;

		var int_width_of_endzone = this.endZoneWidth * this.yardToPixelMultipler;

		var x = 0;
		for ( var i = 0; i < 110; i++ ) {
			this.drawHashes( (int_width_of_endzone + (i * this.yardToPixelMultipler)), 0 );

			this.drawHashes( (int_width_of_endzone + (i * this.yardToPixelMultipler)), (document.getElementById(this.element_id).height * this.hashMarkSecondLineMultiplier) );

			this.drawHashes( (int_width_of_endzone + (i * this.yardToPixelMultipler)), (document.getElementById(this.element_id).height * this.hashMarkThirdLineMultiplier) );

			this.drawHashes( (int_width_of_endzone + (i * this.yardToPixelMultipler)), (document.getElementById(this.element_id).height - this.hashMarkHeight) );
		}
	}

	this.createYardNumbers = function() {
		var int_width_of_endzone = this.endZoneWidth * this.yardToPixelMultipler;

		this.ctx.font = "28px Arial";
		this.ctx.textAlign = "center";
		this.ctx.fillStyle = "#ffffff";

		// First draw the upper yard markers upside down.
		for ( var i = 1; i < 11; i++ ) {
			var str_yard_marker = this.getYardMarker(i);

			this.ctx.save(); // Save the unrotated context of the canvas.
			this.ctx.translate(int_width_of_endzone + (10 * i * this.yardToPixelMultipler), (document.getElementById(this.element_id).height * this.yardMarkersFirstLineMultiplier)); // Move to the center of the canvas to (x, y) point.
			this.ctx.scale(-1, -1);
			this.ctx.fillText(str_yard_marker, 0, 0);
			this.ctx.restore(); // Restore the unrotated context.
		}

		// Now draw the lower yard markers.
		for ( var i = 1; i < 11; i++ ) {
			var str_yard_marker = this.getYardMarker(i);
			
			this.ctx.fillText(str_yard_marker, int_width_of_endzone + (10 * i * this.yardToPixelMultipler), (document.getElementById(this.element_id).height * this.yardMarkersSecondLineMultiplier));
		}
	}
	
 	this.drawLine = function( x ) {
		this.ctx.beginPath();
		this.ctx.moveTo(x, 0);
		this.ctx.lineTo(x, document.getElementById(this.element_id).height);
		this.ctx.stroke();
	}

	this.drawHashes = function( x, y ) {
		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		this.ctx.lineTo(x, y + this.hashMarkHeight);
		this.ctx.stroke();
	}
	
	this.fillEndZones = function(){
		this.ctx.fillStyle = "green";
		this.ctx.fillRect(0, 0, (this.endZoneWidth * this.yardToPixelMultipler), document.getElementById(this.element_id).height);

		this.ctx.fillStyle = "green";
		this.ctx.fillRect(document.getElementById(this.element_id).width - (this.endZoneWidth * this.yardToPixelMultipler), 0, (this.endZoneWidth * this.yardToPixelMultipler), document.getElementById(this.element_id).height);
	}

	this.getYardMarker = function( i ) {
		var str_yard_marker = '';

		switch( i ) {
		    case 6:
		        str_yard_marker = '50';
		        break;
		    case 7:
		        str_yard_marker = '40';
		        break;
	       	case 8:
		        str_yard_marker = '30';
		        break;
		    case 9:
		        str_yard_marker = '20';
		        break;
		    case 10:
		        str_yard_marker = '10';
		        break;
		    default:
		        str_yard_marker = String(10 * i);
		}

		return str_yard_marker;
	}
	
	this.getTeamValue = function( teamAbbreviation, key ) {
		var str_letter = '';
		var str_colour = '';

		switch( teamAbbreviation ) {
		    case 'BC':
		        str_letter = 'B';
		        str_colour = '#f05522';
		        break;
		    case 'EDM':
		        str_letter = 'E';
		        str_colour = '#fcb42b';
		        break;
	       	case 'CGY':
		        str_letter = 'C';
		        str_colour = '#cb232e';
		        break;
		    case 'SSK':
		        str_letter = 'S';
		        str_colour = '#096140';
		        break;
		    case 'WPG':
		        str_letter = 'W';
		        str_colour = '#b99359';
		        break;
		    case 'HAM':
		        str_letter = 'H';
		        str_colour = '#ffb614';
		        break;
	       	case 'TOR':
		        str_letter = 'T';
		        str_colour = '#6890c8';
		        break;
	        case 'OTT':
		        str_letter = 'O';
		        str_colour = '#ab1e2d';
		        break;
		    case 'MTL':
		        str_letter = 'M';
		        str_colour = '#90052b';
		        break;
		}

		if ( key == 'letter' ) {
			return str_letter;
		}
		if ( key == 'colour' ) {
			return str_colour;
		}

		return '';
	}
	
	/*
	this.setStartingPoint = function(yards){
		this.currentPoint = yards * 2 * 3 + 60;
	}
	
	this.markPlay = function(yards){
		endPoint = this.currentPoint + yards * 3 * 2;
		if(endPoint > 660)
			endPoint = 660;
		
		this.ctx.strokeStyle = "blue";
		this.ctx.lineWidth = 10;
		
		this.ctx.beginPath();
		this.ctx.moveTo(this.currentPoint, this.currentPlayY);
		this.ctx.lineTo(endPoint - 4, this.currentPlayY);
		this.ctx.stroke();
		
		this.ctx.beginPath();
		this.ctx.strokeStyle = "black";
		this.ctx.moveTo(endPoint - 4, this.currentPlayY);
		this.ctx.lineTo(endPoint, this.currentPlayY);
		this.ctx.stroke();
		
		this.currentPoint = endPoint;
		this.currentPlayY = this.currentPlayY + 12;
	}
	
	this.yardsToGo = function(){
		var result = (660 - this.currentPoint) / 2 / 3;
		return result;
	}
	
	this.firstDownLine = function(yardLine){
		this.ctx.beginPath();
		this.ctx.moveTo(yardLine * 2 * 3 + 60, 0);
		this.ctx.lineTo(yardLine * 2 * 3 + 60, 300);
		this.ctx.strokeStyle = "yellow";
		this.ctx.lineWidth = 2;
		this.ctx.stroke();
	}
	*/

	this.setTeamInfo();	
	this.drawField();
}