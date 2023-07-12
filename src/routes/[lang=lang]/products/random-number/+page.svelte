<h2>Generate a Random Number</h2>

<script>
    let randomNumber = 0;      // starting value

    function randoNum() {
        randomNumber = Math.floor(Math.random() * 100) + 1       
    }

</script>



    <div>
        <button class="btn" on:click={randoNum}>Generate A Random Number</button>
        <p class="countdown font-mono text-6xl mt-4">{randomNumber}</p>
    </div>





<!-- 
<span class="countdown font-mono text-6xl">
    <span style="--value:0;"></span>
</span> -->
