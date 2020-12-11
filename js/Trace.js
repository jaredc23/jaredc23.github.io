'use strict'

class Trace
{
    constructor(minX, minY, maxX, maxY, maxTraceLength, traceSize, traceColor, circleColor)
    {
        this.ctx = ctx;
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxY;
        this.maxY = maxY;
        this.maxTraceLength = maxTraceLength;
        this.points = [];
        this.traceColor = traceColor;
        this.traceSize = traceSize;
        this.circleColor = circleColor;
    }

    draw(ctx)
    {

        ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
        ctx.beginPath();
        ctx.arc(0, 0, 35, 0, 2 * Math.PI);
        ctx.moveTo(0,-35);
        ctx.lineTo(0,35);
        ctx.moveTo(-35,0);
        ctx.lineTo(35,0);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(0, 153, 255, 1)';
        ctx.beginPath();
        ctx.arc(0, 0, 70, 0, 2 * Math.PI);
        ctx.moveTo(0,-70);
        ctx.lineTo(0,70);
        ctx.moveTo(-70,0);
        ctx.lineTo(70,0);
        ctx.stroke();
        
    }
}