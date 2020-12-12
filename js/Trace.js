'use strict'

class Trace
{
    points = [];
    minDistanceDir = 100;
    angle = 0;
    finished = false;
    collisionCounter = 0;

    constructor(minX, minY, maxX, maxY, maxTraceLength, traceSize, speed, traceColor, circleColor)
    {
        this.ctx = ctx;
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
        this.maxTraceLength = maxTraceLength;
        this.points = [];
        this.points.push({x: 700,y: 100});
        this.points.push({x: 700,y: 100});
        this.traceColor = traceColor;
        this.traceSize = traceSize;
        this.circleColor = circleColor;
        this.speed = speed;
    }

    random(low, high) //Random number inclusive
    {
        return Math.floor(Math.random() * (high+1)) + low;
    }

    getLastPoint(i)
    {
        if(i != undefined)
        {
            return {x: this.points[this.points.length-1-parseInt(i)].x, y:this.points[this.points.length-1-parseInt(i)].y};
        }
        else
            return {x: this.points[this.points.length-1].x, y:this.points[this.points.length-1].y};
    }

    calculateDistance()
    {
        if(this.maxTraceLength < 0)
            return -2;
        var sum = 0;
        for(var i = 0; i < this.points.length - 1; i++)
        {
            sum += Math.sqrt(Math.pow(this.points[i].x - this.points[i+1].x, 2) + Math.pow(this.points[i].y - this.points[i+1].y, 2))
        }
        return sum;
    }

    calculateDistanceCurrentSegment()
    {
        return Math.sqrt(Math.pow(this.getLastPoint(1).x - this.getLastPoint().x, 2) + Math.pow(this.getLastPoint(1).y - this.getLastPoint().y, 2))
    }

    drawRandom(ctx, layer)
    {
        ctx.lineWidth = this.traceSize;
        ctx.fillStyle = this.circleColor;
        ctx.strokeStyle = this.traceColor;

        var radius = this.traceSize;
        

        ctx.strokeStyle = this.traceColor;

        //Drawing the circle of the trace
        ctx.beginPath();
        ctx.arc(this.getLastPoint().x, this.getLastPoint().y, 7*radius/10, 0, Math.PI*2, false);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        //Drawing the first circle of the trace
        ctx.beginPath();
        ctx.arc(this.points[0].x, this.points[0].y, 7*radius/10, 0, Math.PI*2, false);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        //Drawing the line itself
        ctx.beginPath();
        ctx.moveTo(this.points[0].x,this.points[0].y);
        for(var i=1; i < this.points.length; i++)
        {
            
            ctx.lineTo(this.points[i].x,this.points[i].y);
            
        }
        ctx.stroke();

        
    }

    calculations(ctx)
    {
        if(!this.finished)
        {
            if(this.calculateDistance() < this.maxTraceLength || this.calculateCollisions(ctx))
            {
                this.calculateChanges(ctx);
                this.points[this.points.length-1].x += Math.cos(this.angle)*this.speed;
                this.points[this.points.length-1].y += Math.sin(this.angle)*this.speed;
                //if(this.calculateCollisions(ctx))
                 //   this.finished = true;
            }
        }
    }



    calculateChanges(ctx)
    {
        var a = this.random(0,10);
        if((this.calculateDistanceCurrentSegment() > this.minDistanceDir && a == 5) || this.calculateCollisions(ctx))
        {
            var originalAngle = this.angle;
            this.angle = this.random(0,7)*Math.PI/4;
            
            for(var i = 0; i < 9; i++)
            {
                if(!this.calculateCollisions(ctx))
                {
                    if(originalAngle == this.angle-Math.PI || originalAngle == this.angle+Math.PI && this.collisionCounter >= 7)
                        this.finished = true;
                    break;
                }
                else if(i == 8)
                {
                    this.finished = true;
                }
                else
                {
                    this.collisionCounter++;
                    this.angle += Math.PI/4;
                    
                }
            }
            if(!this.finished)
            {
                this.points.push({x:this.points[this.points.length-1].x, y:this.points[this.points.length-1].y});
            }
        }
    }

    calculateCollisions(ctx)
    {
        var width = this.speed + 9*(this.traceSize/10) + 17*Math.abs((this.traceSize/10)*Math.sin(this.angle));
        var height = this.speed + 9*(this.traceSize/10) + 17*Math.abs((this.traceSize/10)*Math.cos(this.angle));
        var checkPointX = this.getLastPoint().x + 13/7*(Math.cos(this.angle))*this.traceSize-width/2;///4 - 2*(Math.cos(this.angle))*9*this.traceSize/7;
        var checkPointY = this.getLastPoint().y + 13/7*(Math.sin(this.angle))*this.traceSize-height/2;///4 + 2*(Math.sin(this.angle))*9*this.traceSize/7 - height/2;
        if(!(checkPointX > this.minX && checkPointX < this.maxX && checkPointY > this.minY && checkPointY < this.maxY))
        {
            console.log("Out of bounds");
            return true;
        }
        ctx.scale(1/devicePixelRatio, 1/devicePixelRatio);
        var imageData = ctx.getImageData(checkPointX*devicePixelRatio, checkPointY*devicePixelRatio, width*devicePixelRatio, height*devicePixelRatio);
        ctx.scale(devicePixelRatio, devicePixelRatio);
        ctx.lineWidth = 20;
        //ctx.putImageData(imageData, 350, 100);
        ctx.beginPath();
        //ctx.rect(this.minX, this.minY, this.maxX, this.maxY);
        ctx.stroke();
        var pxlData = imageData.data;
        
        for(var i = 0; i < imageData.data.length; i+=4)
        {
            if(pxlData[i+3] != 0)
                return true;
        }
        return false;
         
    }
}