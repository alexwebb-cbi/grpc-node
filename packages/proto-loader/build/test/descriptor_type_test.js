"use strict";
/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const proto_loader = require("../src/index");
// Relative path from build output directory to test_protos directory
const TEST_PROTO_DIR = `${__dirname}/../../test_protos/`;
function isTypeObject(obj) {
    return 'format' in obj;
}
describe('Descriptor types', () => {
    it('Should be output for each enum', done => {
        proto_loader.load(`${TEST_PROTO_DIR}/enums.proto`).then(packageDefinition => {
            assert('Enum1' in packageDefinition);
            assert(isTypeObject(packageDefinition.Enum1));
            // Need additional check because compiler doesn't understand
            // asserts
            if (isTypeObject(packageDefinition.Enum1)) {
                const enum1Def = packageDefinition.Enum1;
                assert.strictEqual(enum1Def.format, 'Protocol Buffer 3 EnumDescriptorProto');
            }
            assert('Enum2' in packageDefinition);
            assert(isTypeObject(packageDefinition.Enum2));
            // Need additional check because compiler doesn't understand
            // asserts
            if (isTypeObject(packageDefinition.Enum2)) {
                const enum2Def = packageDefinition.Enum2;
                assert.strictEqual(enum2Def.format, 'Protocol Buffer 3 EnumDescriptorProto');
            }
            done();
        }, error => {
            done(error);
        });
    });
    it('Should be output for each message', done => {
        proto_loader.load(`${TEST_PROTO_DIR}/messages.proto`).then(packageDefinition => {
            assert('LongValues' in packageDefinition);
            assert(isTypeObject(packageDefinition.LongValues));
            if (isTypeObject(packageDefinition.LongValues)) {
                const longValuesDef = packageDefinition.LongValues;
                assert.strictEqual(longValuesDef.format, 'Protocol Buffer 3 DescriptorProto');
            }
            assert('SequenceValues' in packageDefinition);
            assert(isTypeObject(packageDefinition.SequenceValues));
            if (isTypeObject(packageDefinition.SequenceValues)) {
                const sequenceValuesDef = packageDefinition.SequenceValues;
                assert.strictEqual(sequenceValuesDef.format, 'Protocol Buffer 3 DescriptorProto');
            }
            done();
        }, error => {
            done(error);
        });
    });
    it('Can use well known Google protos', () => {
        // This will throw if the well known protos are not available.
        proto_loader.loadSync(`${TEST_PROTO_DIR}/well_known.proto`);
    });
});
//# sourceMappingURL=descriptor_type_test.js.map