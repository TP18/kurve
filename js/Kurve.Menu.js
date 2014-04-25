"use strict";

Kurve.Menu = {
    
    init: function() {
        this.initPlayerMenu();
        this.addWindowListeners();
    },
        
    initPlayerMenu: function() {
        var playerHTML = '';
        
        for (var i in Kurve.players) {
            playerHTML += Kurve.players[i].renderMenuItem();
        }
        
        document.getElementById('menu').innerHTML += playerHTML;
    },
    
    addWindowListeners: function() {
        window.addEventListener('keydown', this.onKeyDown.bind(this), false);
        window.addEventListener('keyup', this.onKeyUp.bind(this), false); 
    },
    
    //to be used !!!!!
    removeWindowListeners: function() {
        window.removeEventListener('keydown', this.onKeyDown, false);
        window.removeEventListener('keyup', this.onKeyUp.bind(this), false);       
    },
    
    onKeyDown: function(event) {
        console.log(event.keyCode);
        console.log('Kurve.Menu: key down');
        
        if (event.keyCode===32) {
            this.onSpacePress();
        }
        
        for (var player in Kurve.players) {
            if ( Kurve.players[player].isKeyLeft(event.keyCode) ) {
                var playerID = Kurve.players[player].id;
                var className = 'active';
                Kurve.players[playerID].isActive = true;
                break;
            } else if (Kurve.players[player].isKeyRight(event.keyCode)) {
                var playerID = Kurve.players[player].id;
                var className = 'inactive';
                Kurve.players[player].isActive = false;
                break;
            }
        }
                
        if (playerID !== undefined) {
            var playerElement = document.getElementById(playerID);
            playerElement.className = playerElement.className.replace('inactive','');
            playerElement.className = playerElement.className.replace('active','');
            playerElement.className = playerElement.className.replace('  ', ' ');
            playerElement.className += ' ' + className;
        }
    },
    
    onKeyUp: function(event) {
        console.log('Kurve.Menu: key up');
    },
    
    onSpacePress: function() {
        console.log('space pressed');
        Kurve.Game.curves = [];
        for (var player in Kurve.players) {
            if (!Kurve.players[player].isActive) continue;
            
            Kurve.Game.curves.push(new Kurve.Curve(Kurve.players[player]));
        }
        if (Kurve.Game.curves.length === 0) return;
        
        document.getElementById('menu').className = 'hidden';
        document.getElementById('canvas').className = '';
        var contentRight = document.getElementById('content-right');
        contentRight.className = contentRight.className.replace(' hidden', '');
        Kurve.Game.startGame();
    }
    
};