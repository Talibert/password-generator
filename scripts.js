        //recuperamos o value do elemento input password-length e atribuimos isso a uma variável
        const rangeEl = document.querySelector("#password-length")
        //recuperamos o campo input que ira exibir a senha
        const inputEl = document.querySelector("#password")
        //recuperamos o exibidor do tamanho da senha, que é um span
        const sizeEl = document.querySelector("#password-length-span")
        //recuperamos a checkbox das letras maiusculas
        const upperEl = document.querySelector("#upper")
        //recuperamos a checkbox dos números
        const numberEl = document.querySelector("#numbers")
        //recuperamos a checkbox dos caracteres especiais
        const specialEl = document.querySelector("#special")
        //recuperamos a barra de segurança
        const securityBarEl = document.querySelector("#security-bar")
        //modificamos o valor do span com textContent e colocamos o value do range
        sizeEl.textContent = 16
        //declaramos a variável responsável pelo tamanho do password
        let passwordLength = rangeEl.value

        //função responsável por gerar a senha
        function gerenatePassword() {
            //senha que será gerada
            let password = ""
            //conjunto básico de caracteres para gerar a senha. Tem que ser let para ser modificado
            let char = "abcdefghjkmnpqrstuvwxyz"
            //conjunto de letras maiúsculas
            const upperChar = "ABCDEFGHJKLMNPQRSTUVWXYZ"
            //conjunto de números
            const numberChar = "123456789"
            //conjunto de simbolos
            const specialChar = "?!@&*()[]"

            //verifica se as maiusculas estão selecionadas e inclui elas na string
            if(upperEl.checked){
                char += upperChar
            }
            //verifica se os numeros estão selecionados e inclui eles na string
            if(numberEl.checked){
                char+=numberChar
            }
            //verifica se os caracteres especiais estão selecionados e inclui eles na string
            if(specialEl.checked){
                char+=specialChar
            }

            //o for irá percorrer a const char de acordo com o número definido no slider
            for (let i = 0; i < passwordLength; i++) {
                //Math.floor é utilizado para arredondar os números e não ficar número quebrado
                //Math.random deve multiplicar a quantidade total de caracteres disponíveis
                //Fazendo isso ele retorna um valor dentro dos caracteres possíveis
                const randomNumber = Math.floor (Math.random() * char.length)
                //o método substring recebe o inicio e o fim e retorna o conteúdo que estiver dentro
                //o método substring irá selecionar o randomNumber e irá "recortar" 1 caracter
                password += char.substring(randomNumber, randomNumber + 1)
            }

            //utilizamos o método value para acessar o valor do elemento recuperado
            inputEl.textContent = password
            passwordSec(rangeEl, upperEl, numberEl, specialEl)
        }

        //criamos um eventlistener de input para que atualize sempre que o range for modificado
        rangeEl.addEventListener("input", () => {
            sizeEl.textContent = passwordLength = rangeEl.value //como a variável foi declarada, podemos usá-la aqui
            gerenatePassword()
            fontSizeCalc()
        })

        //criamos um eventlistener de click para que atualize sempre que as maiusculas forem selecionadas
        upperEl.addEventListener("click", gerenatePassword)
        //criamos um eventlistener de click para que atualize sempre que os numeros forem selecionados
        numberEl.addEventListener("click", gerenatePassword)
        //criamos um eventlistener de click para que atualize sempre que os especiais forem selecionados
        specialEl.addEventListener("click", gerenatePassword)

        function passwordSec (length, upper, number, special) {
            let passwordSecurity = 0

            //adiciona ou remove segurança de acordo com as checkboxes
            if (upper.checked){
                passwordSecurity += 12
            }
            if (number.checked){
                passwordSecurity += 12
            }
            if (special.checked){
                passwordSecurity +=12
            }
            //adiciona ou remove segurança de acordo com o tamanho da senha
            passwordSecurity += length.value * 1

            //remove todas as classes a cada alteração da senha
            securityBarEl.classList.remove("critical", "warning", "completed", "safe");

            //adiciona a classe de acordo com o passwordSecurity
            if (passwordSecurity < 30) {
                securityBarEl.classList.add("critical");
            } else if (passwordSecurity < 60) {
                securityBarEl.classList.add("warning");
            } else if (passwordSecurity < 100) {
                securityBarEl.classList.add("safe");
            } else {
                securityBarEl.classList.add("completed")
            }

            securityBarEl.style.width = `${passwordSecurity}%`
        }

        function fontSizeCalc () {
            if (passwordLength < 35) {
                inputEl.style.fontSize="3vw"
            }   else if (passwordLength >= 35 && passwordLength < 45) {
                    inputEl.style.fontSize="2.5vw"
                }   else if (passwordLength >= 45 && passwordLength <= 64) {
                        inputEl.style.fontSize="2vw"
                    }
        }

        function copy() {
            //essa é uma API de navegadores para copiar textos para a area de colagem do usuário
            navigator.clipboard.writeText(inputEl.textContent)
        }
