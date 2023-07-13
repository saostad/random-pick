<script>
    let numbList = [];
  
    function addNumberToList() {
      const input = document.getElementById("input");
      const number = parseInt(input.value);
  
      if (!isNaN(number)) {
        numbList.push(number);
        input.value = "";
      }
    }
  
    function generateNumber() {
      if (numbList.length > 0) {
        const randomIndex = Math.floor(Math.random() * numbList.length);
        const randomNum = numbList[randomIndex];
        alert("Random Number: " + randomNum);
      }
    }
  </script>
  
  <style>
    button {
      margin-top: 10px;
    }
  </style>
  
  <div>
    <input type="numbList" id="input" placeholder="Enter a number" />
    <button on:click={addNumberToList}>Add number</button>
    <div><button on:click={generateNumber}>Generate Random Number</button></div>
  </div>
  