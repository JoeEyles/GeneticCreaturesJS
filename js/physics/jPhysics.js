class JPhysics {
    constructor (options) {
        this.canvas = canvasElement;
        this.options = options;
        this.entities = [];
        this.paused = false;
    }

    AddEntity(entity) {
        this.push(entity);
    }

    Start() {
        this.paused = false;
        requestAnimationFrame(this.OnLoop.bind(this));
    }

    OnLoop() {
        //Do it

        if(this.paused == false) {
            requestAnimationFrame(this.OnLoop.bind(this));
        }
    }

    Pause() {
        this.paused = true;
    }

    Update(dt) {
        for(var i = 0; i < this.entities.length; i++) {
            //do something
        }
    }
}