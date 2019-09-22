
(function(){
    let environment;

    if (typeof global !== "undefined") environment = "global";
    else environment = this;
    environment.MyPromise = MyPromise;    

    function MyPromise(executor) {
        this.status = "pending";
        this.result = undefined;
        this.onSuccessCallback = [];
        this.onErrorCallbacks = [];

        this.then = function(callback){
            if (this.status === "pending") {
                this.onSuccessCallback.push(callback);
            }
            else {
                callback(this.result);
            }
        }
                   
        function resolve(data) {
            if(this.status !== "pending") return;     

            this.status = "fulfilled";
            this.result = data;    

            for (let callback of this.successCallback) {
                callback(data);
            }
        }

        this.catch = function(){

        }

        function reject(error) {
            this.onErrorCallbacks();
            this.status = "rejected";
            this.result = error;
        } 
        
        console.log(executor.arguments);
        executor(resolve, reject);
    }

    MyPromise.prototype.resolve = function(data) {
        if(this.status !== "pending") return;     

    };

    return MyPromise;
})()

const zzz = new MyPromise((success) => {    
    setTimeout(() => success("done"), 5000);
});


/*

const zzz3 = new InternetPromise((success) => {    
    setTimeout(() => success("done"), 5000);
});

console.log(zzz3);*/
