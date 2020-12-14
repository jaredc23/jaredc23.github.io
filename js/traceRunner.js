class TraceRunner
{
    traces = [];
    constructor(numTraces, minX, minY, maxX, maxY)
    {
        this.traces = [];
        this.navWidth = maxX - minX;
        this.navHeight = maxY - minY;
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
        for(var i = 0; i < numTraces; i++)
        {
            this.traces.push(new Trace(random(minX + navWidth/20, minX + navWidth-navWidth/20), random(minY + navHeight/20, minY + navHeight-navHeight/20),minX,minY,minX+navWidth,minY+navHeight,-1,7,random(1,20)/20,"#FFDF00", "#000000"));
        }
    }

    random(low, high) //Random number inclusive
    {
    return Math.floor(Math.random() * (high+1)) + low;
    }

    draw(ctx)
    {
        for(var i = 0; i < this.traces.length; i++)
            this.traces[i].drawRandom(ctx);
  
        for(var i = 0; i < this.traces.length; i++)
            this.traces[i].calculations(ctx);

            for(var i = 0; i < this.traces.length; i++)
            if(this.traces[i].flag)
              this.traces[i] = new Trace(random(this.minX + this.navWidth/20, this.minX + this.navWidth-this.navWidth/20), random(this.minY + this.navHeight/20, this.minY + this.navHeight-this.navHeight/20),this.minX,this.minY,this.minX+this.navWidth,this.minY+this.navHeight,-1,7,random(1,20)/20,"#FFDF00", "#000000");
    }
}