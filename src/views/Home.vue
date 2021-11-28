
<template>
<h1>WELCOME TO D&D CHARACTER MANAGEMENT WEBAPP</h1>

</template>

<style>
:root {
  font-size: 20px;
  color: var(--color-text-light);
  --color-base-hue: 200;
  --color-danger-hue-offset: 180;
  --color-danger-hue: calc(var(--color-base-hue) - var(--color-danger-hue-offset));
  --color-background-dark: hsl(var(--color-base-hue), 100%, 8%);
  --color-background-light: hsl(var(--color-base-hue), 100%, 16%);
  --color-text-light: hsl(var(--color-base-hue), 100%, 87%);

  --color-btn-primary-background: hsl(var(--color-base-hue), 100%, 83%);
  --color-btn-primary-background-dark: hsl(var(--color-base-hue), 100%, 73%);
  --color-btn-primary-text: hsl(var(--color-base-hue), 100%, 20%);
  --color-btn-primary-text-dark: hsl(var(--color-base-hue), 100%, 10%);
  --color-btn-border: black;
  --color-btn-danger-background: hsl(var(--color-danger-hue), 100%, 83%);
  --color-btn-danger-background-dark: hsl(var(--color-danger-hue), 100%, 73%);
  --color-btn-danger-text: black;
  --color-btn-danger-text-dark: black;
}


.fixed-in-btn{
    color: white;
    position: fixed;
    bottom: 10%;
    right: 3%;
    background: #0FACF3;
    width: 180px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    border-radius: 3px;
    box-shadow: 4px 4px 4px #0a78aa;
    cursor: pointer;
  }

body {
  background: linear-gradient(
    to right,
    var(--color-background-dark),
    var(--color-background-light)
  );
}
</style>
