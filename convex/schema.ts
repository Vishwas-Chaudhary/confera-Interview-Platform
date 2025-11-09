import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values"
export default defineSchema({
    // USERS TABLE
    users: defineTable({
        name: v.string(),
        email: v.string(),
        image: v.optional(v.string()),
        roles: v.union(v.literal("candidate"),v.literal("interviewer")),  // EITHER INTERVIEWER OR CANDIDATE
        clerkId : v.string(),            
    }).index("by_clerk_id", ["clerkId"]),    // these index tell us how to we can call them when need like kind of a name tag 

    // INTERVIEWS TABLE
    interviews: defineTable({
        title: v.string(),
        description: v.optional(v.string()),
        startTime: v.number(),
        endTime: v.optional(v.number()),
        status: v.string(),
        streamCallId: v.string(),
        candidateId: v.string(),
        interviewerIds: v.array(v.string()),
    })
        .index("by_candidate_id", ["candidateId"])
        .index("by_stream_call_id", ["streamCallId"]),
        
    // COMMENTS TABLE
    comments: defineTable({
        content: v.string(),
        rating: v.number(),
        interviewerId: v.string(),
        interviewId: v.id("interviews"),
    })
        .index("by_interview_id", ["interviewId"]),
});


