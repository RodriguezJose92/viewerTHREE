class LoopMachine{
    constructor(){
        this.flagInit       = false;
        this.callbacks      = [];
    };

    // Método para prender
    on(){  
        if (this.flagInit) return;
        this.flagInit = true;
        console.log('¡Iniciando Motores Mudi! 🚀')
        this.run();
    };

    // Método para iniciar el loop 
    run(){
        if (!this.flagInit) return;
        this.callbacks.forEach( my_cb => my_cb() )
        requestAnimationFrame(this.run.bind(this))
    };

    // Método para apagar
    off(){
        this.flagInit = false;
        console.log('Experiencia 3D Animada Mudi Finalizada ✔️')
    };

    // Método para añadir nuevas funcionalidades
    addNewCallback( cb ){
        this.callbacks.indexOf(cb) == -1 && this.callbacks.push( cb )
    };

    // Método para quitar funcionalidades existentes
    removeCallBack( cb ){
        let index = this.callbacks.indexOf( cb )
        this.callbacks.splice(index,1)
    };

};
  
  const loopMachine = new LoopMachine();
  
  export default loopMachine;