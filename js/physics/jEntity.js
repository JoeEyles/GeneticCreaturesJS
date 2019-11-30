class JEntity {
    constructor(options) {
        this.options = options;
        this.position = options.position;
        this.velocity = options.velocity;
        if(options.mass > 0)
            options.mass_inv = 1.0/options.mass;
        else
            options.mass_inv = Infinity;
    }

    DoesIntersect(entity) {
        //TODO: when looping, the calling function should be careful not to call the same function again, but with entity1 and entity2 swapped
        //return intersection info if there is an intersection 
        return {
            overlap: 10,
            minRestitution: Math.min(this.options.restitution, entity.options.restitution),
            normal: [0,0],
            entity1: this,
            entity2: entity
        }
    }

}