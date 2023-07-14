<script>
  let numbList = [];

  function addNumberToList() {
    const input = document.getElementById("input");
    const number = parseInt(input.value);

    if (!isNaN(number)) {
      numbList = [...numbList, number];
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

  #g-btn {
    background-color: black;
    
  }

  #container {
    margin-left: 10%;
  }
</style>

<div id="container">
  <input type="number" id="input" placeholder="Enter a number" />
  <button on:click={addNumberToList}>Add number</button>
  <div>
    <button id="g-btn" on:click={generateNumber}>Generate Random Number</button>
  </div>
  {#if numbList.length > 0}
    <div>
      <h3>Numbers:</h3>
      <ul>
        {#each numbList as number}
          <li>{number}</li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
