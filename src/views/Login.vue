 <template>
    <main class="grid place-items-center pt-24">
        <img src="../assets/ticketpass-logo.png" width="240" class="rounded-full mb-3" />
            <Form @submit="onSubmit" :validation-schema="schema" class="w-8/12 mx-auto flex flex-wrap gap-3 mt-24 md:w-3/8 lg:w-1/2 xl:w-1/4 2xl:w-1/6">
                <div class="field">
                    <Field name="email" type="email" class="field border-2 border-gray-200 rounded-3xl px-4" placeholder="Email Address" />
                    <ErrorMessage name="email" class="ml-4 mt-2 block text-red-500" />
                </div>
                <div class="field">
                    <div class="field w-full flex items-center border-2 border-gray-200 rounded-3xl px-4">
                        <Field name="password" type="password" class="border-0" :type="showPassword ? 'text' : 'password'" placeholder="Password" />
                    </div>
                    <ErrorMessage name="password" class="ml-4 mt-2 block text-red-500" />
                </div>
                <input type="submit" value="LOG IN" class="bg-green-400 text-gray-100 active:scale-95 duration-300 text-center text-base px-5 py-1 w-4/12 mx-auto rounded-full mt-4"/>
            </Form>
    </main>
</template>

<style scoped>
 .field {
     @apply w-full py-3;
     outline: none;
 }
</style>

<script>
    import { useForm, Field, ErrorMessage, Form } from "vee-validate";
    import * as Yup from "yup";
    import { useUserStore } from "@/stores/auth.js";
    import { watch } from "vue";

    export default {
    name: "App",
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
            const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        });
        return {
            schema,
        };
    },
    setup() {
        const user = useUserStore();
        return {
            user
        }
    },
    methods: {
        async onSubmit(values) {
            try {
                var formdata = new FormData();
                    formdata.append("grant_type", "password");
                    formdata.append("client_id", "966c01ba-31b1-40a2-8f4c-fab8b1373bd7");
                    formdata.append("username", values.email);
                    formdata.append("password", values.password);
                var requestOptions = {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow'
                };
                const userRequest = await fetch("http://127.0.0.1:8000/api/login", requestOptions);

                console.log('[userRequest]', await userRequest);
                const { access_token, refresh_token, token_type, expires_in } = await userRequest.json();
                var userLogin = await this.user.logIn(access_token, refresh_token, expires_in, true);
                console.log(userLogin);
                if (userLogin) {
                     this.$cookies.set("user", access_token, {expires: expires_in});
                    this.$router.push("/");
                } else {
                    alert("Invalid Credentials");
                    return false;
                }
            } catch (error) {
                console.log('error', error);
            }
        },
    }
    };

</script>