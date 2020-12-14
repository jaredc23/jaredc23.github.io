'use strict'

class Trace
{
    points = [];
    minDistanceDir = 150;
    angle = 0;
    finished = false;
    collisionCounter = 0;
    shouldBe = 0;

    constructor(startx, starty, minX, minY, maxX, maxY, maxTraceLength, traceSize, speed, traceColor, circleColor)
    {
        this.ctx = ctx;
        this.minX = minX+maxX/30;
        this.minY = minY+maxY/30;
        this.maxX = maxX-maxX/30;
        this.maxY = maxY-maxY/30;
        this.maxTraceLength = maxTraceLength;
        this.points = [];
        this.startx = startx;
        this.starty = starty;
        this.points.push({x: startx,y: starty});
        this.points.push({x: startx,y: starty});
        this.traceColor = traceColor;
        this.traceSize = traceSize;
        this.circleColor = circleColor;
        this.speed = speed;
        this.angle = this.random(0,3)*Math.PI/2;
        this.flag = false;
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

    calculateActualDistance()
    {
        var sum = 0;
        for(var i = 0; i < this.points.length - 1; i++)
        {
            sum += Math.sqrt(Math.pow(this.points[i].x - this.points[i+1].x, 2) + Math.pow(this.points[i].y - this.points[i+1].y, 2))
        }
        return sum;
    }

    calculateDistance()
    {
        var sum = 0;
        for(var i = 0; i < this.points.length - 1; i++)
        {
            sum += Math.sqrt(Math.pow(this.points[i].x - this.points[i+1].x, 2) + Math.pow(this.points[i].y - this.points[i+1].y, 2))
        }
        if(this.maxTraceLength < 0 && !isNaN(sum))
            return -2;
        else if(isNaN(sum))
            return NaN;
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

        if(this.calculateActualDistance() < 5)
            this.shouldBe++;
        else
            this.shouldBe = 0;

        if(isNaN(this.calculateDistance()) || (this.shouldBe > 500) || (this.points.length > 20 && this.calculateActualDistance() < 100 && this.finished == false))
        {
            if(isNaN(this.points[0].y))
                this.points[0].y = this.points[1].y;
            else if(this.shouldBe > 500)
            {
                this.shouldBe = 0;
                this.finished = false;
            }
            else
            {
                this.flag = true;
            }
            /*
            this.points = [];
            var a = {x:this.random(this.maxX/20, this.maxX-this.maxX/20), y: this.random(this.maxX/20, this.maxY-this.maxY/20)};
            this.points.push(a);
            this.points.push(a);
            console.log(this.points);
            this.shouldBe = 0;
            this.finished = false;*/ 
        }
        
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
            else if(this.calculateDistance() >= this.maxTraceLength)
                this.finished = true;
        }
        else
        {
            if(this.points.length>2)
            {
                if(this.points[0].x == this.points[1].x && this.points[0].y == this.points[1].y)
                {
                    this.points.shift();
                }
                
                if(this.points.length>2)
                {
                    if(this.points[0].x == this.points[1].x)
                    {
                        var g = this.points.y
                        this.points[0].y -= (Math.abs(this.points[0].y-this.points[1].y)/(this.points[0].y-this.points[1].y)).toFixed(0)*this.speed;
                    }
                    else
                        this.points[0].x -= (Math.abs(this.points[0].x-this.points[1].x)/(this.points[0].x-this.points[1].x)).toFixed(0)*this.speed;
                }
                else
                {
                    var b = this.points[0];
                    this.points = [];
                    this.points.push({x: b.x, y: b.y});
                    this.points.push({x: b.x, y: b.y});
                    this.finished = false;
                }
            }
            
        }
    }



    calculateChanges(ctx)
    {
        var a = this.random(0,10);
        if((this.calculateDistanceCurrentSegment() > this.minDistanceDir && a == 5) || this.calculateCollisions(ctx))
        {
            
            var originalAngle = this.angle;
            this.angle = this.random(0,3)*Math.PI/2;
            
            for(var i = 0; i < 4; i++)
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
                    this.angle += Math.PI/2;
                    
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
        var width = this.speed + 8*(this.traceSize/10) + 17*Math.abs((this.traceSize/10)*Math.sin(this.angle));
        var height = this.speed + 8*(this.traceSize/10) + 17*Math.abs((this.traceSize/10)*Math.cos(this.angle));
        var checkPointX = this.getLastPoint().x + 13/7*(Math.cos(this.angle))*this.traceSize-width/2;///4 - 2*(Math.cos(this.angle))*9*this.traceSize/7;
        var checkPointY = this.getLastPoint().y + 13/7*(Math.sin(this.angle))*this.traceSize-height/2;///4 + 2*(Math.sin(this.angle))*9*this.traceSize/7 - height/2;
        if(!(checkPointX > this.minX && checkPointX < this.maxX && checkPointY > this.minY && checkPointY < this.maxY))
        {
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