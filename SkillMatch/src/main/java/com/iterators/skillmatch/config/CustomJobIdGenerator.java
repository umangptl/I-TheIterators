package com.iterators.skillmatch.config;

import com.iterators.skillmatch.model.Job;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class CustomJobIdGenerator extends AbstractMongoEventListener<Job> {

    @Override
    public void onBeforeConvert(BeforeConvertEvent<Job> event) {
        Job entity = event.getSource();
        if (isNew(entity)) {
            // Generate a custom ObjectId with a specific length
            UUID uuid = UUID.randomUUID();

            // Convert the UUID to a hexadecimal string
            String uuidString = uuid.toString().replace("-", "");

            // Take the first 6 characters from the UUID string
            String randomString = uuidString.substring(0, 6);
            entity.setJobId(randomString);
        }
    }

    private boolean isNew(Job entity) {
        // Implement your logic to check if the entity is new or existing
        // For example, check if the entity has an existing ObjectId or other criteria.
        return entity.getJobId() == null;
    }
}
