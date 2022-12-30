<script setup lang="ts">
import '@/style/main.css';
import { APP_CONTENT_ELEMENT_ID } from './config/constant';
</script>

<template>
	<router-view :name="APP_CONTENT_ELEMENT_ID" :id="APP_CONTENT_ELEMENT_ID" />
</template>
