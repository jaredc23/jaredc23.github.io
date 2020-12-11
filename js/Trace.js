'use strict'

class Trace
{
    points = [];
    constructor(minX, minY, maxX, maxY, maxTraceLength, traceSize, speed, traceColor, circleColor)
    {
        this.ctx = ctx;
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxY;
        this.maxY = maxY;
        this.maxTraceLength = maxTraceLength;
        this.points = [];
        this.points.push({x: 0,y: 40});
        this.points.push({x: 0,y: 40});
        this.traceColor = traceColor;
        this.traceSize = traceSize;
        this.circleColor = circleColor;
        this.speed = speed*5;
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

        ctx.lineWidth = this.traceSize;
        ctx.fillStyle = this.circleColor;
        ctx.strokeStyle = this.traceColor;

        var radius = this.traceSize;

        //Drawing the circle of the trace
        ctx.beginPath();
        ctx.arc(this.getLastPoint().x, this.getLastPoint().y, 7*radius/10, 0, Math.PI*2, false);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        //Drawing the line itself
        ctx.beginPath();
        ctx.moveTo(this.points[0].x,this.points[0].y);
        ctx.lineTo(this.points[1].x,this.points[1].y);
        ctx.stroke();
        if(this.calculateDistance() < this.maxTraceLength)
            this.points[1].x += this.speed;
    }
}