<template>
	<div style="background-color: #F6F7FA">
        <q-layout>
            <q-toolbar slot="header">
                <router-link to="/">
                    <q-btn flat>
                        <q-icon color="light" name="home" />
                    </q-btn>
                </router-link>
                <q-toolbar-title>
                    Kratzbaumzentrale
                    <span slot="subtitle">
                        Controlpanel zur Welteroberung
                    </span>
                </q-toolbar-title>
            </q-toolbar>
            <div class="layout-padding">
                <router-view />
            </div>
        </q-layout>
    </div>
</template>

<script>
/*
 * Root component
 */
export default {}
</script>

<style></style>
