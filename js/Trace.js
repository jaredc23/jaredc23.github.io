'use strict'

class Trace
{
    points = [];
    minDistanceDir = 100;
    angle = 0;

    constructor(minX, minY, maxX, maxY, maxTraceLength, traceSize, speed, traceColor, circleColor)
    {
        this.ctx = ctx;
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxY;
        this.maxY = maxY;
        this.maxTraceLength = maxTraceLength;
        this.points = [];
        this.points.push({x: 700,y: 100});
        this.points.push({x: 700,y: 100});
        this.traceColor = traceColor;
        this.traceSize = traceSize;
        this.circleColor = circleColor;
        this.speed = speed/3;
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
/*
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 3;
        ctx.fillStyle = "#FF0000";
        var checkPointX = this.getLastPoint().x + (Math.cos(this.angle))*this.traceSize + (Math.cos(this.angle))*this.traceSize;
        var checkPointY = this.getLastPoint().y + (Math.sin(this.angle))*this.traceSize + (Math.sin(this.angle))*this.traceSize;
        ctx.beginPath();
        ctx.arc(checkPointX, checkPointY, 3, 0, Math.PI*2, false);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        
*/
        ctx.lineWidth = this.traceSize;
        ctx.fillStyle = this.circleColor;
        ctx.strokeStyle = this.traceColor;

        var radius = this.traceSize;

        ctx.strokeStyle = "#FF0000";
        ctx.beginPath();
        ctx.arc(700, 100, 100, 0, Math.PI*2, false);
        ctx.closePath();
        ctx.stroke();
        ctx.strokeStyle = this.traceColor;

        //Drawing the circle of the trace
        ctx.beginPath();
        ctx.arc(this.getLastPoint().x, this.getLastPoint().y, 7*radius/10, 0, Math.PI*2, false);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        //Drawing the circle of the trace
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
        if(this.calculateDistance() < this.maxTraceLength || this.calculateCollisions(ctx))
        {
            this.calculateChanges(ctx);
            this.points[this.points.length-1].x += Math.cos(this.angle)*this.speed;
            this.points[this.points.length-1].y += Math.sin(this.angle)*this.speed;
        }
    }



    calculateChanges(ctx)
    {
        var a = this.random(0,10);
        if((this.calculateDistanceCurrentSegment() > this.minDistanceDir && a == 5) || this.calculateCollisions(ctx))
        {
            this.angle = this.random(0,7)*Math.PI/4;
            for(var i = 0; i < 8; i++)
            {
                if(!this.calculateCollisions(ctx))
                    break;
                else if(i == 7)
                    this.maxTraceLength = this.calculateDistance();
                else
                    this.angle += Math.PI/4;
            }

            this.points.push({x:this.points[this.points.length-1].x, y:this.points[this.points.length-1].y});
        }
    }

    calculateCollisions(ctx)
    {
        var checkPointX = this.getLastPoint().x + (Math.cos(this.angle))*this.traceSize - (Math.cos(this.angle))*this.traceSize;
        var checkPointY = this.getLastPoint().y + (Math.sin(this.angle))*this.traceSize - (Math.sin(this.angle))*this.traceSize;

        var imageData = ctx.getImageData(700, 100,100, 100);
        //alert("checcking");
        var pxlData = imageData.data;
        for(var i = 0; i < imageData.data.length; i+=4)
        {
            if(pxlData[i+3] != 0)
                return true;
            pxlData[i+3] = 1;
        }
        console.log(imageData.data);
        ctx.putImageData(imageData, 700, 100);
        debugger;
        return false;
    }
}