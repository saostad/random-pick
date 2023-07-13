<h2>Generate a Random Number</h2>


<script>
    let randomNumber = 0;      // starting value

    import { randoNum } from "$helpers/utils";

</script>



    <div>
        <button class="btn" on:click= {()=> randomNumber = randoNum()}>Generate A Random Number</button>
        <p class="countdown font-mono text-6xl mt-4">{randomNumber}</p>
    </div>


