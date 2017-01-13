Page({
    data: {
        iconType: 'waiting_circle',
        iconColor: 'white',
        resultData: "0",
        resultTip: "",
        num1: "1",
        num2: "2",
        num3: "3",
        num4: "4",
        num5: "5",
        num6: "6",
        num7: "7",
        num8: "8",
        num9: "9",
        num0: "0",
        toDot: ".",
        toPlus: "＋",
        toMul: "×",
        toMinus: "－",
        toDiv: "÷",
        toRes: "=",
        toClear: "clear",
        toBack: "back",
        operMark: { "＋": "+", "－": "-", "×": "*", "÷": "/", ".": "." },
        isInput: true,
        lastIsOper: false,
        arr: []
    },
    toClick: function (e) {
        var id = e.target.id;

        //backspace
        if (id == this.data.toBack) {
            var data = this.data.resultData;
            if (data == "0") return;

            data = data.substring(0, data.length - 1);

            if (data == "") {
                data = 0;
            }
            this.setData({ "resultData": data });
            this.data.arr.pop();

        } else if (id == this.data.toClear) {
            this.setData({ "resultData": 0 });
            this.data.arr.length = 0;

        } else if (id == this.data.toRes) {

            var data = this.data.resultData;

            if (data == 0) return;

            var num = "";
            var arr = this.data.arr;
            var optArr = [];

            for (var i in arr) {
                if (!isNaN(arr[i]) || arr[i] == this.data.toDot) {
                    num += arr[i];
                } else {
                    optArr.push(num);
                    optArr.push(arr[i]);
                    num = "";
                }
            }
            optArr.push(Number(num));
            var result = Number(optArr[0]);

            for (var i = 1; i <= optArr.length; i++) {

                if (isNaN(optArr[i])) {

                    if (optArr[i] == this.data.toPlus) {

                        result += Number(optArr[i + 1]);

                    } else if (optArr[i] == this.data.toMinus) {

                        result -= Number(optArr[i + 1]);

                    } else if (optArr[i] == this.data.toMul) {

                        result *= Number(optArr[i + 1]);

                    } else if (optArr[i] == this.data.toDiv) {

                        if (optArr[i + 1] == 0) {
                            this.setData({ "resultTip": "除数不能为0" });
                            return;
                        } else {
                            result /= Number(optArr[i + 1]);
                        }

                    }
                }
            }
            this.setData({ "resultData": result + "" });
            this.data.isInput = false;
            this.data.arr.length = 0;

        } else {
            if (!this.data.isInput) {
                this.setData({ "resultData": "0" });
                this.data.isInput = true;
            }
            var oldData = this.data.resultData;

            // 输入的是是 + - * /
            if (this.data.operMark[id]) {
                if (this.data.lastIsOper || oldData == "0") {
                    return;
                }
            }

            var newData;

            if (oldData == "0") {
                newData = id;
            } else {
                newData = oldData + id;
            }

            this.setData({ "resultData": newData });
            this.data.arr.push(id);

            if (this.data.operMark[id]) {
                this.setData({ "lastIsOper": true });
            } else {
                this.setData({ "lastIsOper": false });
            }
        }
    }
});