<template>
    <div class="container">
      <h4>Taxonomy terms:</h4>
      <div>
        <label>Add a taxonomy term</label><br/>
        <input type="text" placeholder="Add a taxonomy term"/>
      </div>
      <div>
        <label>Vocabulary</label><br/>
        <select>
          <option disabled>Pick a vocabulary</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </div>
</template>

<script>
  export default {
    name: "taxonomy"
  }
</script>

<style scoped>

</style>
