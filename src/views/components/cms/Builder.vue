<template>
    <div>
        <div class="flex justify-between" v-show="$store.state.cms.editing">
            <h2 class="mb-4 text-3xl">Block Section</h2>

            <div>
                <select v-model="_columns" class="p-4 border-2 border-black mb-2">
                    <option value="2">2 columns</option>
                    <option value="3">3 columns</option>
                    <option value="4">4 columns</option>
                </select>
            </div>
        </div>
        <div
            class="container mx-auto flex flex-col md:flex-row md:items-justify flex-wrap"
        >
            <div
                v-for="(block, block_key) in filteredBlocks"
                :key="block_key"
                class="px-5 py-8 md:p-10 text-inherit relative md:w-1/2"
                :class="'bg-' + block.background + ' lg:w-1/' + _columns"
            >
                <div>
                    <!-- Arrow/Eye section -->
                    <div
                        class="cursor-pointer mb-4"
                        v-if="$store.state.cms.editing"
                    >
                        <div
                            class="z-50 bg-white border-solid border-2 border-r-0 border-black inline-block text-2xl p-1 px-2"
                        >
                            <div class="flex items-center text-black">
                                    <font-awesome-icon 
                                        icon="times"
                                        class="fa-fw"
                                        @click="removeBlock(block_key)"
                                        title="delete"
                                    />
                            </div>
                        </div>

                        <div
                            class="z-50 bg-white border-solid border-2 border-r-0 border-black inline-block text-2xl p-1 px-2"
                            :class="
                                determineArrow(block_key) == null
                                    ? 'border-r-2'
                                    : ''
                            "
                        >
                            <div
                                class="flex items-center text-black"
                                @click="
                                    block.status =
                                        block.status == 'active'
                                            ? 'inactive'
                                            : 'active'
                                "
                            >
                                <font-awesome-icon
                                    icon="eye"
                                    class="fa-fw"
                                    v-if="block.status === 'active'"
                                    title="show"
                                ></font-awesome-icon>
                                <font-awesome-icon
                                    icon="eye-slash"
                                    class=""
                                    title="hide"
                                    v-else
                                ></font-awesome-icon>
                            </div>
                        </div>
                        <!-- This is going left -->
                        <div
                            @click="leftClick(block_key)"
                            v-if="
                                determineArrow(block_key) == 'left' ||
                                determineArrow(block_key) == 'both'
                            "
                            class="z-50 bg-white inline-block border-solid border-2 border-black text-2xl p-1 px-2"
                            :class="
                                determineArrow(block_key) == 'both'
                                    ? 'border-r-0'
                                    : ''
                            "
                        >
                            <div class="flex items-center text-black">
                                <font-awesome-icon
                                    icon="arrow-left"
                                    class="fa-fw"
                                    title="move left"
                                ></font-awesome-icon>
                            </div>
                        </div>
                        <!-- This is going right -->
                        <div
                            @click="rightClick(block_key)"
                            v-if="
                                determineArrow(block_key) == 'right' ||
                                determineArrow(block_key) == 'both'
                            "
                            class="z-50 bg-white border-solid border-2 border-black inline-block text-2xl p-1 px-2"
                        >
                            <div class="flex items-center text-black">
                                <font-awesome-icon
                                    icon="arrow-right"
                                    class="fa-fw"
                                    title="move right"
                                ></font-awesome-icon>
                            </div>
                        </div>
                        <!-- End of Arrow/Eye section -->
                    </div>

                    <div v-if="$store.state.cms.editing" class="max-w-sm">
                        <label>Headline</label>
                        <input
                            type="text"
                            v-model="block.headline"
                            class="min-w-full border-2 border-black"
                        />

                        <label class="mt-2">Description</label>
                        <div class="border-2">
                             <ckeditor 
                                :editor="editor"
                                v-model="block.desc"
                                :config="{
                                    toolbar: [
                                        'bold',
                                        'italic',
                                        'heading',
                                        '|',
                                        'link',
                                        'paragraph',
                                        'numberedList',
                                        'bulletedList',
                                        'undo',
                                        'redo',
                                    ],
                                }"
                              ></ckeditor>
                        </div>

                        <label class="mt-2">Button Text</label>
                        <input
                            type="text"
                            v-model="block.button_text"
                            class="min-w-full border-2 border-black"
                        />

                        <label class="mt-2">Button URL</label>
                        <div class="flex" :class="_columns > 2 ? 'flex-col justify-center' : 'flex-row items-center' ">
                            
                                <div class="relative flex-1 w-full">
                                    <select
                                        v-model="block.button_url_type"
                                        class="pr-8 min-w-full text-black py-1 border-2 border-black"
                                        :class="_columns > 2 ? 'mb-4 ': 'border-r-0'"

                                    >
                                        <option
                                            v-for="(type, type_key) in urlTypes"
                                            :key="type_key"
                                            :label="
                                                type_key === 'internal'
                                                    ? 'localhost:8080/'
                                                    : 'https://'
                                            "
                                            :value="type"
                                            v-text="type_key"
                                            class="text-black"
                                           
                                        ></option>
                                    </select>
                                    <div
                                        class="absolute top-0 right-0 mt-3 mr-2 text-2xl pointer-events-auto"
                                    >
                                        <i class="fas fa-caret-down text-black"></i>
                                    </div>
                                </div>
                            
                            <input
                                type="text"
                                v-model="block.button_url"
                                class="flex-1 w-full border-2 border-black bl-0"
                                style="height: 32px;"
                               
                            />
                        </div>

                        <label class="mt-4"> Background </label>

                        <select
                            v-model="block.background"
                            class="text-black capitalize border-2 border-black mt-2"
                        >
                            <option
                                v-for="(bg, bg_key) in colors"
                                :key="bg_key"
                                :value="bg"
                                v-text="bg_key"
                            ></option>
                        </select>
                    </div>
                    
                </div>
            </div>

            <div
                class="md:w-1/2 px-5 py-8 md:p-10 flex justify-center items-center text-xl bg-green-500 select-none cursor-pointer"
                v-if="$store.state.cms.editing"
                :class="'md:w-1/' + _columns"
                @click="addBlock"
            >
                <i class="fas fa-plus-circle mr-4"></i> Add Block
            </div>
        </div>
    </div>
</template>

<script>
// import WYSIWYG from "@ckeditor/ckeditor5-build-inline";
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default {
    props: ["blocks", "columns"],
    components: { 
        ckeditor: CKEditor.component
     },
    data() {
        return {
            colors: {
                red: "red-500",
                black: "purple-500",
                white: "orange-500",
                blue: "blue-500",
                grey: "yellow-500",
            },
            urlTypes: {
                internal: "internal",
                external: "external",
            },
            editor: ClassicEditor
            
        };
    },
   
    computed: {
        _blocks: {
            get() {
                return this.blocks;
            },
            set(value) {
                this.$emit("updateBlocks", value);
            },
        },
        filteredBlocks() {
            return this.blocks.filter(
                (e) => e.status == "active" || this.$store.state.cms.editing
            );
        },
        _columns: {
            get() {
                return this.columns;
            },
            set(value) {
                this.$emit("updateColumns", value);
            },
        },
    },
    methods: {
        removeBlock(i) {
            //Did this for Vue3 Implementation as I'm currently migrating this code.
            let blocks = JSON.parse(JSON.stringify(this._blocks));
            blocks.splice(i, 1);
            this._blocks = blocks;
            
        },
        determineArrow(i) {
            if (i == 0 && this._blocks.length < 2) {
                return null;
            }
            if (i == 0) {
                return "right";
            }
            if (i + 1 == this._blocks.length && this._blocks.length > 1) {
                return "left";
            } else if (this._blocks.length > 1) {
                return "both";
            }
            return null;
        },
        leftClick(indexToMoveLeft) {
            if (indexToMoveLeft == 0) {
                //Why are you trying to move this left out of bounds, and how did you do this?
                return;
            }
            //I.E current item to move is 4
            let currItem = this._blocks[indexToMoveLeft];
            //I.E left item is 3
            let leftItem = this._blocks[indexToMoveLeft - 1];
            
            //This implementation works in vue3
            //Move the item left of the current item to the current item index.
            this._blocks[indexToMoveLeft] = leftItem;
            this._blocks[indexToMoveLeft - 1] = currItem;

            //This implementation works in vue2
            //Move the item left of the current item to the current item index.
            //this.$set(this._blocks, indexToMoveLeft, leftItem);
            //Move the current item left.
            //this.$set(this._blocks, indexToMoveLeft - 1, currItem);
        },
        rightClick(indexToMoveRight) {
            if (indexToMoveRight == this._blocks.length - 1) {
                //Why are you trying to move this right out of bounds, and how did you do this?
                return;
            }
            //I.E current item to move is 4
            let currItem = this._blocks[indexToMoveRight];
            //I.E right item is 5
            let rightItem = this._blocks[indexToMoveRight + 1];
            this._blocks[indexToMoveRight] = rightItem;
            this._blocks[indexToMoveRight + 1] = currItem;

            //Move the item right of the current item to the current item index.
            //this.$set(this._blocks, indexToMoveRight, rightItem);
            //Move the current item right.
            //this.$set(this._blocks, indexToMoveRight + 1, currItem);
        },
        addBlock() {
            this._blocks = [
                ...this._blocks,
                {
                    status: "active",
                    url: "",
                    background: this.colors[
                        Object.keys(this.colors)[
                            Math.floor(
                                Math.random() * Object.keys(this.colors).length
                            )
                        ]
                    ],
                    button_url_type: "internal",
                    button_text: null,
                },
            ];
            
        },
    },
};
</script>

<style scoped>
label {
    @apply font-bold;
}

input {
    color: black !important;
}
</style>