
(function(){
    let environment;

    if (typeof global !== "undefined") environment = "global";
    else environment = this;
    environment.MyPromise = MyPromise;    

    function MyPromise(executor) {
        if (typeof executor !== "function") throw new Error("MyPromise parameter must be a function");

        this._status = "pending";
        this._result = undefined;
        this._query = [];

        this.then = function(callback){
            if (this.status === "pending") {
                this.onSuccessCallback.push(callback);
            }
            else {
                callback(this.result);
            }
        }
                   
        function resolve(data, self) {
            if(self.status !== "pending") return;     

            self.status = "fulfilled";
            self.result = data;    
            console.log(self.result);
        }

        this.catch = function(){

        }

        function reject(error) {
            this.onErrorCallbacks();
            this.status = "rejected";
            this.result = error;
        }        
                   
        executor(function(value) {resolve(value, this)}, function(value) {reject(value, this)});

    }



    MyPromise.prototype.resolve = function(data) {
        if(this.status !== "pending") return;     

    };

    return MyPromise;
})()

const zzz = new MyPromise((success) => {    
    setTimeout(() => success("done"), 5000);
});

console.log(this);


const zzz1 = new MyPromise(function (resolve){
    resolve(42)
});

console.log(zzz1);

zzz1
    .then(function (value) {
        return value + 1
    })
    .then(function (value) {
        console.log(value) // 43
        return new Promise(function (resolve) { resolve(137) })
    })
    .then(function (value) {
        console.log(value) // 137
        throw new Error()
    })
    .then(
        function () { console.log('Будет проигнорировано') },
        function () { return 'ошибка обработана' }
    )
    .then(function (value) {
        console.log(value) // "ошибка обработана"
    })

/*

const zzz3 = new InternetPromise((success) => {    
    setTimeout(() => success("done"), 5000);
});

console.log(zzz3);*/
