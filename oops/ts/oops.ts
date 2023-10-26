class polygon{
    private_l:number;
    private_n:number;
     private_canvas:HTMLCanvasElement;
    X:number;
    y:number;
    private_name:string;
    private_id:number
    _l: string;
    private _name: string;
    canvas: HTMLCanvasElement;
    l: number;
    n: number;
    id: number;
    name: any;
    private _n: string;
    private _x: string;
    private _y: string;
    private _id: string;
    constructor(l:number,n:number,canvas:HTMLCanvasElement,x:number,y:number,id:number,name:string){
        this.l=l;
        this.n=n;
        this.canvas=canvas;
        this.X=x;
        this.y=y;
        this.name=this.name;
        this.id=id;

    }
    Display(){
        console.log("name="+this._name);
        console.log("l="+this._l);
        console.log("n="+this._n);
        console.log("x="+this._x);
        console.log("y="+this._y);
        console.log("id="+this._id);
    }
    
}