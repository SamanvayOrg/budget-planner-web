import sampleMetadataTest from './sampleMetadata.test';
import {getDetailsForMajorHeadName} from './metadata';

describe('metadata', () => {
    it('should get major head by name', () => {
        const metadata = sampleMetadataTest;
        let details = getDetailsForMajorHeadName(metadata, 'Property Tax');
        expect(details.majorHead.name).toBe('Property Tax');
        expect(details.majorHeadGroup.name).toBe('Revenue Receipt');
    })

    it('should not fail when major head name not provided', () => {
        const metadata = sampleMetadataTest;
        let majorHead = getDetailsForMajorHeadName(metadata, undefined);
        expect(majorHead).not.toBeDefined();
    })
})