<template>
    <select id="template" class="form-control select2" style="width: 100%;" v-bind:multiple="multiple"></select>
</template>

<script>
    import 'admin-lte/plugins/select2/css/select2.css'
    import 'admin-lte/plugins/select2-bootstrap4-theme/select2-bootstrap4.css'
    import 'admin-lte/plugins/jquery/jquery'
    import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle'
    import 'admin-lte/plugins/select2/js/select2.full'
    import $ from "jquery"

    export default {
        name: "select2",
        // props: [
        //     'options',
        //     'value',
        // ],
        props: {
            options: {
                type: Array
            },
            value: null,
            multiple: {
                type: Boolean,
                default: false
            }
        },
        template: '#template',
        mounted() {
            let vm = this;
            $(this.$el)
                // init select2
                .select2({ data: this.options, theme: 'bootstrap4'})
                .val(this.value)
                .trigger('change')
                // emit event on change.
                .on('change', function() {
                    vm.$emit('input', this.value);
                })
        },
        watch: {
            value: function(value) {
                // update value
                $(this.$el).val(value);
            },
            options: function(options) {
                // update options
                $(this.$el)
                    .empty()
                    .select2({ data: options, theme: 'bootstrap4' });
            }
        },
        destroyed() {
            $(this.$el).off().select2('destroy')
        }

    }
</script>

<style scoped>

</style>