<template>
    <div class="login">
        <form>
            <h1>yo Slim Shady, please sign up</h1>

            <div class="form-group">
                <label>Full Name</label>
                <input type="text" class="form-control"/>
            </div>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" />
            </div>

            <button type="submit" class="btn btn-primary">Sign Up</button>

            <p class="forgot-password text-right">
                Already registered? 
                <router-link :to="{name: 'Login'}">sign in</router-link>
            </p>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>