<template>
    <div>
         <el-button >Button</el-button>
         <el-dialog title="Hello world">
                <p>Try Element</p>
        </el-dialog>
    </div>
</template>
<script>
import { Button,Dialog } from 'element-ui';
export default {
    components: {
       Button, Dialog,
  },
    name: 'app',
    data() {
        return {
            message: 'one piece'
        }
    }
}
</script>
<style scoped>
    div{
        width: 200px;
        height: 200px;
        border: 1px solid red;
    }
</style>


